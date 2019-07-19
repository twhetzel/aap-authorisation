import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import history from "../history";

import ElixirAuthService from '../ElixirAuthService';
import jwt_decode from 'jwt-decode';

import { AuthConsumer, AuthContext } from '../auth-context';


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


// export default function MenuAppBar() {
function MenuAppBar() {
    const classes = useStyles();

    const user = useContext(AuthContext)

    // Set auth status for Testing
    // const [auth, setAuth] = React.useState(false);
    // console.log("** Login Toggle State: ", auth);

    const eas = new ElixirAuthService();

    let userName = ''
    if (eas.loggedIn()) {
        userName = jwt_decode(eas.getToken()).name;
        console.log("Username: ", userName);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // Change auth toggle for Testing
    // function handleChange(event) {
    //     setAuth(event.target.checked);
    // }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    function handleLogout() {
        handleMenuClose();

        // Clear token
        eas.logout();

        // Use Context to reset auth status
        user.onLogout();


        // Redirect to Home page for Testing
        // window.location.href = "/"

        // Refresh Home page on Logout
        history.push("/");


        // Reset "auth" so Login is displayed for Testing
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
                                {<span>{userName}</span>}
                                <IconButton
                                    aria-label="Account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
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
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
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


// export default MenuAppBar

export default () => (
    <AuthConsumer>
        {(context) => (
            <MenuAppBar
                onLogout={context.onLogout}
                isAuthenticated={context.isAuthenticated}
            />
        )}
    </AuthConsumer>
)
