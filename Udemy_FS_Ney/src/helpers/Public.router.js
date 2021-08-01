import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRouter = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (<Component {...props}/> )}
    />
)