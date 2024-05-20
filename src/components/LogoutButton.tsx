// components/LogoutButton.tsx
import { useRouter } from 'next/navigation';
import './logoutbutton.css';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/'); // Mengarahkan ke halaman login
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <span>Logout</span>
      <i className="bi bi-box-arrow-right align-items-end"></i>
    </button>
  );
}
