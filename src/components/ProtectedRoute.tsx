// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login'); // Mengarahkan ke halaman login jika tidak ada user
    }
  }, [router]);

  return <>{children}</>;
}
