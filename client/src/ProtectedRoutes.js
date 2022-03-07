import React from 'react'
import {Redirect, Route} from 'react-router-dom'

// make a protected routes component
const ProtectedRoutes = ({component: Component, ...rest}) => {
    // check if user is authenticated
    const isAuthenticated = localStorage.getItem('dataAdmin')
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/admin/login" />
                )
            }
        />
    )
}

export default ProtectedRoutes;