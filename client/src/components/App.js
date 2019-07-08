import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import 'react-reflex/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {DesktopApp} from "./DesktopApp";
import {MobileApp} from "./MobileApp";

export const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/mobile" component={MobileApp} />
            <Route component={DesktopApp} />
        </Switch>
    </BrowserRouter>
);