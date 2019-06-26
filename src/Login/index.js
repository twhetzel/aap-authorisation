import React, { Component } from 'react';
import elixir_login_button from '../elixir_login_button.png';
import Grid from '@material-ui/core/Grid';
import ElixirAuthService from '../ElixirAuthService';
import jwt_decode from 'jwt-decode';

const AAP_URL = process.env.REACT_APP_AAPURL;

class Login extends Component {
    constructor(props) {
        super(props);

        this.ElixirAuthService = new ElixirAuthService();
        // Check if token exists in local storage, 
        // otherwise set to ''
        this.token = this.ElixirAuthService.getToken();
        console.log("** Current Token: ", this.token);

        // Check if token is still valid
        if (this.ElixirAuthService.isTokenExpired(this.token)) {
            console.log("** Need to refresh token")
        } else {
            console.log("** Token is still valid")
        }


        this.handleLogin = this.handleLogin.bind(this);

    }

    componentWillMount() {
        if (this.ElixirAuthService.loggedIn())
            this.props.history.replace('/');
    }


    handleLogin = () => {
        // Example: https://gitlab.ebi.ac.uk/tools-glue/ng-ebi-authorization/blob/master/src/auth/auth.service.ts
        console.log("** Elixir Button clicked!")
        this.ElixirAuthService.login();

        // this.ElixirAuthService.getToken();
    }

    componentDidMount() {
        window.addEventListener('message', (event) => {
            console.log("** Elixir Window sent event data.");
            console.log("** Event: ", event)
            console.log("** Token: ", event.data);

            if (!this.messageIsAcceptable(event)) {
                return;
            }

            // Store JWT in local storage
            const token = event.data;
            this.ElixirAuthService.setToken(token);

            var decoded = jwt_decode(token);
            console.log("** Decoded Token: ", decoded);

            // Update user profile
            // this.updateUser();

            // Set state... not sure if needed
            // this.ElixirAuthService.setState({ isLoggedIn: true });
            // console.log("** ElixirAuth Login State: ", this.state.isAuthenticated);
        });
    }

    /**
    * Check if the message is coming from the same domain we use to generate
    * the SSO URL, otherwise it's iffy and shouldn't trust it.
    */
    messageIsAcceptable(event) {
        return event.origin === AAP_URL;
    }

    render() {
        return (
            <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item xs={12} sm={6}>
                    Single Sign On using your ELIXIR identity!
                </Grid>

                <Grid item xs={12} sm={6}>
                    <button onClick={this.handleLogin}>
                        <img src={elixir_login_button} alt="login" />
                    </button>
                </Grid>

                <Grid item xs={12} sm={6}>
                    You can use the ELIXIR identity service and other ELIXIR services with the freely available
                    ELIXIR identity, which integrates with Google, ORCID and most academic institutions.

                    Obtain your ELIXIR identity here.
                </Grid>
            </Grid>
        )
    }
}
export default Login
