import React, { Component } from 'react'
import { Container, Navbar, Nav, NavDropdown, Form, Row, Col, Button } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect, Link } from 'react-router-dom'

import './Login.css'

export default class Login extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false

        }
        this.validator = new SimpleReactValidator();

        this.state = {
            user: '',
            pass: '',
            loggedIn
        }


    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        e.preventDefault();
    }

    handleSubmit = e => {
        if (this.validator.allValid()) {
            // this.props.history.push('/Dashboard');
            this.setState({
                loggedIn: true
            })
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
        const { user, pass } = this.state
        // login magic
        if (user === "user" && pass === "123") {
            localStorage.setItem("token", "jsndjbsjbdhsbdjbjjwj")
        }

        e.preventDefault();

    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/user" />
        }

        return (
            <div className='login'>
                <div className="loginbx">
                    <Container>
                        <Form onSubmit={this.handleSubmit} noValidate>
                            <h2 className="text-center">Welcome</h2>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" className="Form.Control" name="user" placeholder="Username" value={this.state.user} onChange={this.handleChange} noValidate />
                                <Form.Text className="text-muted">
                                    {this.validator.message('Username', this.state.user, 'required|alpha_num_dash_space|min:2')}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" className="Form.Control" name="pass" placeholder="Password" value={this.state.pass} onChange={this.handleChange} noValidate />
                                <Form.Text className="text-muted">
                                    {this.validator.message('Username', this.state.pass, 'required|alpha_num_dash_space|min:2')}
                                </Form.Text>
                            </Form.Group>
                            <hr />
                            <Link to="/">Back</Link>
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </div>
            </div>
        )
    }
}