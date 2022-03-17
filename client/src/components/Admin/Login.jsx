import React, { Component } from 'react'
import { Typography, TextField, Grid, Link, Paper } from '@material-ui/core'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button, Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SimpleReactValidator from 'simple-react-validator';

class Login extends Component {
    constructor(props) {
        super(props)
        const login = JSON.parse(localStorage.getItem('login'))
        this.validator = new SimpleReactValidator()

        let loggedIn = true;
        if (login == null) {
            loggedIn = false
        }
        this.state = {
            email: "",
            password: "",
            login: false,
            dataError: "",
            errorMessage: "Email atau password salah",
            loggedIn
        }
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = e => {
        this.props.history.push("/signup")
    }

    handleTo = e => {
        this.props.history.push("/")
    }

    login = e => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        if (this.validator.allValid()) {
            axios.post('http://localhost:8000/login', data)
                .then((response) => {
                    this.setState({ dataError: response.data.error })
                    if (this.state.dataError) {
                        console.log(this.state.dataError)
                    } else {
                        console.log(response.data)
                        console.log(response)
                        localStorage.setItem('login', JSON.stringify({
                            login: true,
                            token: response.data.token,
                            kd_admin: response.data.kd_admin,
                            nama: response.data.nama,
                            gambar: response.data.gambar,
                            email: response.data.email,
                            password : response.data.password
                        }))
                        this.props.history.push("/home")
                    }
                })
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }
    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to="/home" />;
        }
        return (
            [
                'Light'
            ].map((variant, idx) => (

                <div className="login">

                    <div className="Nav">
                        <Navbar bg="dark" variant="dark" expands="md">
                            <Navbar.Brand>Ourflow</Navbar.Brand>
                            <Nav className="mr-auto">
                                <Nav.Link onClick={this.handleTo}>
                                        Home
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Button variant="secondary" block onClick={this.handleClick}>
                                    Sign Up
                                </Button>
                            </Nav>
                        </Navbar>
                    </div>
                    <div>
                        <center style={{
                            height: "90vh",
                            display: "flex",
                        }}>
                            <Grid container component="main" style={{
                                width: '70vw',
                                margin: "auto",
                                justifyContent: "center",
                            }}>
                                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                                    <div className="paper" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: 30
                                    }}>
                                        <Typography component="h1" variant="h5">
                                            Log In
                                        </Typography>
                                        <form noValidate onSubmit={this.login} style={{ width: '100%' }}>
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    autoComplete="email"
                                                    autoFocus
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                    noValidate
                                                />
                                                {this.state.dataError ? <div style={{ color: 'red' }}>{this.state.errorMessage}</div> : null}
                                                {this.validator.message('email', this.state.email, `required|email`, { className: 'text-danger' })}
                                            </div>
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="password"
                                                    label="Password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="password"
                                                    autoFocus
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                    noValidate
                                                />
                                                {this.state.dataError
                                                    ? <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
                                                    : null}
                                                {this.validator.message('password', this.state.password, `required|min:4`, { className: 'text-danger' })}
                                            </div>
                                            <br/>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="dark"
                                                color="primary"
                                                block
                                            >Log In</Button>
                                            <Grid container>
                                                <Grid item>
                                                    <div style={{ fontSize: 15 }}>
                                                        Don't have an account? 
                                                    <Link href="/signup" variant="body2">
                                                        Sign Up
                                                    </Link>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </div>
                                </Grid>
                            </Grid>
                        </center>
                    </div>
                </div>
            ))
        );
    }
}

export default Login