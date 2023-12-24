import { useContext, useState } from "react";
import { ContextProvider } from "../../provider/AuthProvider";
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import Logo from "./Logo";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact', 'Others'];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logOutUser, user } = useContext(ContextProvider)
// console.log(user)

    const handleSignOut = () => {
        
        logOutUser()
            .then(() => {
                console.log('sign out successfully')
            })
    }



    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography sx={{ my: 2 }}>
                <Logo></Logo>
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {
                    user &&
                    <Button onClick={handleSignOut} sx={{ backgroundColor: '#f289cb' }} variant="contained" endIcon={<LogoutIcon />}>
                        Sign Out
                    </Button>
                }
            </List>
        </Box>
    );



    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar sx={{ backgroundColor: '#1B4242' }} component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Logo></Logo>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#fff', marginRight: '20px' }}>
                                    {item}
                                </Button>
                            ))}
                            {
                                user &&
                                <Button onClick={handleSignOut} sx={{ backgroundColor: '#f289cb' }} variant="contained" endIcon={<LogoutIcon />}>
                                    Sign Out
                                </Button>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </div>
    );
};

// Navbar.propTypes = {
//     indow: PropTypes.func,
// };

export default Navbar;