import {HashRouter, Switch, Route} from 'react-router-dom'
import {ReflexContainer, ReflexElement, ReflexSplitter} from 'react-reflex'
import 'react-reflex/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {SidebarMenu} from "./SidebarMenu";
import {HomePage} from "../pages/HomePage";
import {LogPage} from "../pages/LogPage";
import {AutopilotPage} from "../pages/AutopilotPage";


export const App = () => (
    <HashRouter>
        <ReflexContainer orientation="vertical">
            <ReflexElement flex={.2}>
                <SidebarMenu />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement>
                <Switch>
                    <Route path="/log" component={LogPage} />
                    <Route path="/autopilot" component={AutopilotPage} />
                    <Route component={HomePage}/>
                </Switch>
            </ReflexElement>
        </ReflexContainer>
    </HashRouter>
);