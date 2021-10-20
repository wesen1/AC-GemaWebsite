/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2020 wesen
 * @license MIT
 */

import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import UserList from "./components/UserList.js";

/**
 * Main entry point for the user admin subsystem.
 * Provides the routes for each user admin component.
 */
export default class UserAdmin extends React.Component
{
    /**
     * Renders the routes for each map archive component.
     * Also renders a toolbar to navigate between the map archive components.
     */
    render()
    {
        return <HashRouter basename="/users">
            <Switch>
              <Route exact path="/" component={UserList} />
            </Switch>
        </HashRouter>;
    }
}
