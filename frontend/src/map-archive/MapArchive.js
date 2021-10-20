/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, Form } from 'react-bootstrap';
import React from "react";

import MapDetails from "./components/MapDetails.js";
import MapList from "./components/MapList.js";
import MapUpload from "./components/MapUpload.js";
import UserUploadsList from "./components/UserUploadsList.js";

/**
 * Main entry point for the map archive subsystem.
 * Provides the routes for each map archive component.
 */
export default class MapArchive extends React.Component
{
    constructor(_props)
    {
        super(_props);
        this.state = {
            mapDetailsId: null
        };
    }


    handleMapSelection(_mapId)
    {
        this.setState({mapDetailsId: _mapId});
    }


    /**
     * Renders the routes for each map archive component.
     * Also renders a toolbar to navigate between the map archive components.
     */
    render()
    {
        if (this.state.mapDetailsId !== null && this.props.match !== "/maps/map-details")
        { // A map was selected, redirect to the map details page for the map
            let mapDetailsId = this.state.mapDetailsId;
            this.setState({mapDetailsId:  null});
            return <Redirect push to={"/maps/map-details/" + mapDetailsId} />;
        }
        else
        {
            // bg="light" variant="light"
            return <HashRouter basename="/maps">

                <Navbar bg="light" variant="light" expand="lg" style={{
                    "margin-bottom": "5px"
                }}>

                <Container>
                <Row>

                <Col>
                <Nav className="mr-auto">
                    <Nav.Link href="#/maps/">Map List</Nav.Link>
                    <Nav.Link href="#/maps/upload">Upload maps</Nav.Link>
                    <Nav.Link href="#/maps/uploads/1">My Uploads</Nav.Link>
                    <Nav.Link href="#/maps/uploads">All Uploads</Nav.Link>
                </Nav>
                </Col>
</Row>
            </Container>

            </Navbar>


                   <Switch>
                <Route exact path="/">
                       <MapList onMapSelection={this.handleMapSelection.bind(this)} />
                     </Route>

                     <Route path="/map-details/:mapId" component={MapDetails}/>

                <Route path="/upload/" component={MapUpload} />

                <Route exact path="/uploads">
                <UserUploadsList onMapSelection={this.handleMapSelection.bind(this)}/>
                </Route>

                     <Route path="/uploads/:userId">
                <UserUploadsList userId={1} onMapSelection={this.handleMapSelection.bind(this)}/>
                     </Route>
                   </Switch>
                 </HashRouter>;
        }
    }
}
