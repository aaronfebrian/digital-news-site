// src/app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../config/db';
import User from '../../../../models/users';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    // Pastikan password tidak kosong atau undefined
    if (!password) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }

    // Buat user baru
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration failed:', error);
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
