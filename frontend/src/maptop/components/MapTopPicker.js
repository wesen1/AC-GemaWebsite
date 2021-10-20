/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2021 wesen
 * @license MIT
 */

import React from 'react';
import ComboBox from 'react-responsive-combo-box'
import {Col, Container, Row} from "react-bootstrap";

export default class MapTopPicker extends React.Component
{
    state = {}

    componentDidMount()
    {
        let self = this;
        fetch("http://localhost:12345/maps").then(function(_response){
            _response.json().then(function(_result){
                self.setState({users: _result});
            });
        });
    }

    render()
    {
        const mapSelections = [
            "gibbed-gema11",
            "gema_la_momie",
            "ac_unarmed_gema"
        ];

        const weaponSelections = [
            "Knife Only",
            "Pistol Only",
            "Submachine Gun",
            "Sniper Rifle",
            "Shotgun",
            "Carbine",
            "Assault Rifle"
        ];

        return <Container>
            <Row>
                <Col xs={6}>
                    <ComboBox
                        options={weaponSelections}
                        enableAutocomplete
                        onSelect={this.onWeaponSelected.bind(this)}
                        focusColor='teal'
                        placeholder="Select a weapon"
                        style={{width: "100%", background: "#fff"}}
                    />
                </Col>
                <Col xs={6}>
                    <ComboBox
                        options={mapSelections}
                        enableAutocomplete
                        onSelect={this.onMapSelected.bind(this)}
                        focusColor='teal'
                        placeholder="Select a map"
                        style={{width: "100%", background: "#fff"}}
                    />
                </Col>
            </Row>
        </Container>;
    }

    onMapSelected(_mapName)
    {
        this.setState({
            selectedMap: _mapName
        });
    }

    onWeaponSelected(_weaponName)
    {
        this.setState({
            selectedWeapon: _weaponName
        });
    }
}
