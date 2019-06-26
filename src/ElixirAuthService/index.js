// import React, { Component } from 'react';
// import elixir_login_button from '../elixir_login_button.png';
// import Grid from '@material-ui/core/Grid';
import jwt_decode from 'jwt-decode';

// class ElixirAuthService extends Component {
export default class ElixirAuthService {
    constructor() {
        // super(props)
        // this.state = {
        //     isAuthenticated: false
        // };

        this.getProfile = this.getProfile.bind(this);

        //This binding is necessary to make `this` work in the callback
        // this.handleLogin = this.handleLogin.bind(this);
    }

    // handleLogin = () => {
    login = () => {
        // Example: https://gitlab.ebi.ac.uk/tools-glue/ng-ebi-authorization/blob/master/src/auth/auth.service.ts
        console.log("** Elixir Button clicked!")
        window.open("https://api.aai.ebi.ac.uk/sso?from=http%3A%2F%2Flocalhost%3A3000", "_blank");

    }

    // componentDidMount() {
    //     window.addEventListener('message', (event) => {
    //         console.log("** Elixir Window sent event data.");
    //         console.log("** MessageEvent: ", event)
    //         console.log("** Token: ", event.data);

    //         // Store JWT in local storage
    //         const token = event.data;
    //         this.setToken(token);

    //         // var decoded = jwt_decode(token);
    //         // console.log("** Decoded Token: ", decoded);

    //         // Set state... not sure if needed
    //         this.setState({ isLoggedIn: true });
    //         console.log("** ElixirAuth Login State: ", this.state.isAuthenticated);
    //     });
    // }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(token) {
        // Saves user token to localStorage
        localStorage.setItem("id_token", token);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return jwt_decode(this.getToken());
    }



    componentWillUnmount() {
        window.removeEventListener('logout', this.logout);
        console.log("** Removed listener");

        // Clear state... not sure if needed
        // this.setState({ isLoggedIn: false });
        // console.log("** ElixirAuth Login State: ", this.state.isAuthenticated);
    }


    // render() {
    //     return (
    //         <Grid container
    //             direction="column"
    //             justify="center"
    //             alignItems="center">
    //             <Grid item xs={12} sm={6}>
    //                 Single Sign On using your ELIXIR identity!
    //             </Grid>

    //             <Grid item xs={12} sm={6}>
    //                 <button onClick={this.handleLogin}>
    //                     <img src={elixir_login_button} alt="login" />
    //                 </button>
    //             </Grid>

    //             <Grid item xs={12} sm={6}>
    //                 You can use the ELIXIR identity service and other ELIXIR services with the freely available
    //                 ELIXIR identity, which integrates with Google, ORCID and most academic institutions.

    //                 Obtain your ELIXIR identity here.
    //             </Grid>
    //         </Grid>
    //     )
    // }
}
// export default ElixirAuthService
