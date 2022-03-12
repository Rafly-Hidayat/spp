import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";

export default class Logout extends Component {
    constructor(props) {
        super(props)
        localStorage.removeItem("token")

        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn
        }
    }
    render() {

        return (
            <div>
                <h1>You have been log out</h1>
                <Link to="/">Login Again</Link>
            </div>
        )
    }
}
