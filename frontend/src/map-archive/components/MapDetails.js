/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import { Container, Row, Col, Table, Figure } from "react-bootstrap";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import MapRevisionList from "./MapRevisionList.js";

export default class MapDetails extends React.Component
{
    constructor(_props)
    {
        // TODO: id in URL, must load other stuff from id
        super(_props);

        console.log(_props);

        this.state = {
        };

    }


    fetchMapInformation(_mapId)
    {
        fetch("http://localhost:12345/maps/" + _mapId)
         .then(response => response.json())
         .then(result => {
             this.setState(result);
         });
    }

    handleRating(_event, _newUserRating)
    {
        let numberOfRatings = this.state.numberOfRatings;
        let ratingSum;

        if (this.state.userRating === null)
        { // First time that this player rates the map, must modify the number of ratings
            ratingSum = this.state.totalRating * numberOfRatings + _newUserRating;
            numberOfRatings++;
        }
        else
        {
            ratingSum = this.state.totalRating * numberOfRatings - this.state.userRating + _newUserRating;
        }

        this.setState({
            userRating: _newUserRating,
            numberOfRatings: numberOfRatings,
            totalRating: (ratingSum / numberOfRatings).toFixed(2)
        });
    }



    componentDidMount()
    {
        this.fetchMapInformation(this.props.match.params.mapId);
    }



    render()
    {
        // TODO: Registered users can edit some details (e.g. screenshot, Creator, etc.)

        return <Container>

            <Row>
              <Col>
                <h1>Map Details for { this.state.name }</h1>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Table bordered hover>
                  <tbody>
                    <tr>
                      <th>Map Message</th>
                      <td colSpan={2}>{ this.state.mapMessage }</td>
                    </tr>
                    <tr>
                      <th>Creator</th>
                      <td colSpan={2}>{ this.state.createdBy }</td>
                    </tr>
                    <tr>
                      <th>Added by</th>
                      <td colSpan={2}>{ this.state.addedBy }</td>
                    </tr>
                    <tr>
                      <th>Added on</th>
                      <td colSpan={2}>{ this.state.addDate }</td>
                    </tr>
                    <tr>
                      <th>Total Rating</th>
                      <td>
                        <Rating
                          value={this.state.totalRating}
                          readOnly={true}
                          precision={0.5}
                        />
                      </td>
                      <td>
                        {this.state.totalRating} ({this.state.numberOfRatings} votes)
                      </td>
                    </tr>
                    <tr>
                      <th>Your Rating</th>
                      <td colSpan={2}>
                        <Rating
                          name="user-rating"
                          value={this.state.userRating}
                          onChange={this.handleRating.bind(this)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Difficulty</th>
                      <td colSpan={2}>
                        <Rating
                          value={2}
                          readOnly={true}
        precision={1}
        iconFilled={"#ff0000"}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
            </Col>

            <Col xs={12} md={6}>
              <Figure>
                <Figure.Image
                  width={600}
                  src={this.state.screenshotUrl}
                  alt={"Screenshot for " + this.state.name }
                  thumbnail={true}
                />
                <Figure.Caption>
                  Screenshot
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>


          <Row>
            <Col>
              <MapRevisionList revisions={ this.state.revisions }/>
            </Col>
          </Row>

        </Container>;
    }
}
