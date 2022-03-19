import React from 'react'
import {Redirect, Route} from 'react-router-dom'

// make a protected routes component
const ProtectedRoute = ({component: Component, ...rest}) => {
    // check if user is authenticated
    const isAuthenticated = localStorage.getItem('dataSiswa')
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/user/login" />
                )
            }
        />
    )
}

export default ProtectedRoute;