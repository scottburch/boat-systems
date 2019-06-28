import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {MobileAutopilotPage} from "../pages/mobile/MobileAutopilotPage";

export const MobileApp = () => (
    <Switch>
        <Route component={MobileAutopilotPage}/>
    </Switch>
);