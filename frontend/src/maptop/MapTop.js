/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2020 wesen
 * @license MIT
 */

import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import MapTopPicker from "./components/MapTopPicker.js";
import MapScoreList from "./components/MapScoreList.js";

/**
 * Main entry point for the map top subsystem.
 * Provides the routes for each user admin component.
 */
export default class MapTop extends React.Component
{
    /**
     * Renders the routes for each map archive component.
     * Also renders a toolbar to navigate between the map archive components.
     */
    render()
    {
        return <HashRouter basename="/maptops">
            <Switch>
                <Route exact path="/">
                    <MapTopPicker />
                    <MapScoreList />
                </Route>
            </Switch>
        </HashRouter>;
    }
}
