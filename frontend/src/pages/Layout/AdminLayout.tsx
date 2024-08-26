import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavDrawer from '../../components/AdminPanel/NavDrawer';


const AdminLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <NavDrawer open={open} setOpen={setOpen} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
