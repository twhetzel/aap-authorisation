import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { Link, Redirect } from 'react-router-dom';

import ElixirAuthService from '../ElixirAuthService';

import { AuthConsumer } from '../auth-context';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


// const loggedOutStatus = () => ({
//     isAuthenticated: false,
//     JWTToken: null
// });


export default function MenuAppBar() {
    const classes = useStyles();

    // const [auth, setAuth] = React.useState(false);
    // console.log("** Login Toggle State: ", auth);

    // TODO: Get Auth status from ElixirAuthService ... 
    // or new User Hook https://codious.io/user-management-with-react-hooks/
    const eas = new ElixirAuthService();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // function handleChange(event) {
    //     setAuth(event.target.checked);
    // }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }


    // TODO: Need to get auth status after first login!
    // !! This isn't working properly, sometimes takes two Elixir button clicks to change status
    function getAuthState() {

        // return new Promise(resolve => {
        //     // Listen for event and set "auth" based on returned data
        //     window.addEventListener('message', (event) => {
        //         if (eas.loggedIn()) {
        //             setAuth(true);
        //         }
        //         else {
        //             setAuth(false)
        //         }
        //     })
        // })
    }

    // TEST!!!
    // const getAuthState_NEW = async (event) => {
    //     const authenticated = await eas.loggedIn();
    //     if (authenticated) {
    //         console.log("** Yeah - we're authenticated!");
    //     }
    //     else {
    //         console.log("** Nope, not authenticated");
    //     }
    // }



    function handleLogout() {
        handleMenuClose();

        // Clear token
        eas.logout();

        // Use Context to reset context
        // onLogout()

        // TODO: use Router to handle this
        // Redirect to Home page
        window.location.href = "/"

        // Refresh Home page on Logout
        // router.push({ pathname: '/empty' });
        // router.replace({ pathname: '/route-to-refresh' });
        // this.props.history.push("/");


        // Reset "auth" so Login is displayed
        // setAuth(false);
    }

    return (
        <div className={classes.root}>
            <FormGroup>
                {/* <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} aria-label="LoginSwitch" />}
                    label={auth ? 'Logout' : 'Login'}
                /> */}
            </FormGroup>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        AAP Demo
                    </Typography>

                    {/* <AuthConsumer>
                        {({ isAuthenticated }) => <h4> Login State: {isAuthenticated.toString()}</h4>}
                    </AuthConsumer> */}

                    <AuthConsumer>
                        {value => value.isAuthenticated && (<div>
                            {/* Authentication is TRUE */}
                            <div>
                                <IconButton
                                    aria-label="Account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                    {/* {<h4>{`Hello, ${user.name}`}</h4>} */}
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                                    {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
                                    {/* Works, page is refreshed but needs updates to more React-like */}
                                    <MenuItem onClick={handleLogout} component={Link} to="/">Logout</MenuItem>

                                    {/* <MenuItem component={Redirect} to={{ pathname: "/", state: { from: "/login" } }}>Logout</MenuItem> */}
                                </Menu>
                            </div>
                        </div>)}
                    </AuthConsumer>

                    <AuthConsumer>
                        {value => !value.isAuthenticated && (<div>
                            {/* Authentication is FALSE */}
                            <Button component={Link} to="/login" color="inherit">
                                Login
                        </Button>
                        </div>)}
                    </AuthConsumer>

                </Toolbar>
            </AppBar>
        </div>
    );
}

