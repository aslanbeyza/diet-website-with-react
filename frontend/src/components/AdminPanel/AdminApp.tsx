import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import NavDrawer from './NavDrawer';

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
const AdminApp: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <NavDrawer open={open} setOpen={setOpen} />
      <Main open={open}>
        {children}
      </Main>
    </Box>
  );
};

export default AdminApp;
