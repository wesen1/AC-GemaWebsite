/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Button, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import React from 'react';

import MapArchive from './map-archive/MapArchive.js';
import MapTop from './maptop/MapTop.js';
import UserAdmin from './user-admin/UserAdmin.js';

/**
 *
 */
export default class App extends React.Component
{
    constructor(_props)
    {
        super(_props);

        this.state = {
            user: { isLoggedIn: true }
        };
    }

    render()
    {
        let userOptions;
        if (this.state.user.isLoggedIn)
        {
            userOptions = <NavDropdown
            title="wesen"
            drop="down"
            id="basic-nav-dropdown"
            alignRight={true}>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/logout">Log out</NavDropdown.Item>
                </NavDropdown>;
        }
        else
        {
            userOptions = <Form inline>
              <Button variant="primary">
                Log in
              </Button>
                </Form>;
        }


        /*

          <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
          </Form>

          */

        return <HashRouter>

            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Navbar.Brand href="#/maps">AC Gema</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav bg="dark" className="mr-auto">
                  <Nav.Link href="#/maps">Maps</Nav.Link>
                    <Nav.Link href="#/maptops">Map Tops</Nav.Link>
                  <Nav.Link href="#/gtop">Gema Top</Nav.Link>
                  <Nav.Link href="#/users">Users</Nav.Link>
                  {/*
                  <Nav.Link href="#/about">About</Nav.Link>
                  <Nav.Link href="#/notifications">Notifications</Nav.Link>
                   */}
                </Nav>

                {userOptions}

              </Navbar.Collapse>
            </Navbar>

            <Switch>
              <Route exact path="/">
                <Redirect replace to="/maps"/>
              </Route>
            <Route path="/maps" component={MapArchive}/>
            <Route path="/users" component={UserAdmin}/>
            <Route path="/maptops" component={MapTop} />
            </Switch>
          </HashRouter>;
    }
}
