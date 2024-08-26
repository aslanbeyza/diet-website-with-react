import React from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, styled, alpha, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

// Arama kutusunun stili
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.grey[500]}`, // Border ekleme
  backgroundColor: alpha(theme.palette.common.white, 0.65),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
   
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`, 
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch', 
    },
  },
}));

const Appbar: React.FC<AppbarProps> = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar>
        {!open && (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              YÖNETİCİ PANELİ
            </Typography>
          </>
        )}
        {open && (
          <Search>
            <SearchIconWrapper>
              <SavedSearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Ara…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
