// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../config/db';
import User from '../../../../models/users';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Login berhasil
    return NextResponse.json({
      message: 'Login successful',
      user: {
        email: user.email,
        username: user.username,
        role: user.role
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
