import { Outlet } from 'react-router-dom';
import AdminApp from '../components/AdminPanel/AdminApp';


const Admin = () => {
  return (
    <AdminApp> {/* AdminApp bileşeni ile içerik sarmalayın */}
      <Outlet /> {/* Alt rotalar burada render edilecektir */}
    </AdminApp>
  );
};

export default Admin;
