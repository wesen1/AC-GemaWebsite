/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

import BootstrapTable from 'react-bootstrap-table-next';
/* import overlayFactory from 'react-bootstrap-table2-overlay'; */
import paginationFactory, { PaginationProvider,
                            PaginationListStandalone,
                            PaginationTotalStandalone,
                            SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

export default class UserList extends React.Component
{
    state = {}

    componentDidMount()
    {
        let self = this;
        fetch("http://localhost:12345/users").then(function(_response){
            _response.json().then(function(_result){
                self.setState({users: _result});
            });
        });
    }

    onApproveButtonClicked(_row, _event)
    {
        alert("You downloaded " + _row.name + " in revision " + _row.revision);
        _event.stopPropagation();
    }

    onRejectButtonClicked(_row, _event)
    {
        alert("You downloaded " + _row.name + " in revision " + _row.revision);
        _event.stopPropagation();
    }

    formatActions(_cell, _row, _rowIndex, _formatExtraData)
    {
        return <div>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>Approve</Tooltip>}
            >
              <Button
        onClick={this.onApproveButtonClicked.bind(this, _row)}
        className="action-button"
        style={{
            "background-color": "green",
            "border": "0"
        }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>Reject</Tooltip>}
            >
              <Button
        onClick={this.onRejectButtonClicked.bind(this, _row)}
    className="action-button"
    style={{
        "background-color": "red",
        "border": 0,
        "margin-left": "5px"
    }}
              >
                <FontAwesomeIcon icon={faBan} />
              </Button>
            </OverlayTrigger>
          </div>;
    }

    render()
    {
        const columns = [{
            text: 'Name',
            dataField: 'name',

            sort: true,
            searchable: true,

            headerAlign: 'center',
            headerClasses: 'col-6'
        },{
            text: 'Created at',
            dataField: 'createdAt',

            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2'
        },{
            text: 'Approved at',
            dataField: 'approvedAt',

            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2'
        },{
            text: 'Actions',
            dataField: 'id',

            sort: false,
            searchable: false,

            formatter: this.formatActions.bind(this),

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-4',
            style: {
                padding: 0,
                verticalAlign: "middle"
            }
        }];

        const data = this.state.users ? this.state.users : [];

        const paginationOption = {
            custom: true,
            totalSize: data.length
        };

        return <Container
        style={{
            "margin-top": "5px"
        }}
>

            <ToolkitProvider
               keyField="id"
               data={ data }
               columns={ columns }
               search>
              {
                props => (
                  <div>
                    <SearchBar { ...props.searchProps } placeholder="Search users"/>
                    <hr />

                    <PaginationProvider
                      pagination={ paginationFactory(paginationOption) }
                    >
                      {
                        ({
                          paginationProps,
                            paginationTableProps
                        }) => (
                          <div>
                            <BootstrapTable
                              { ...props.baseProps }
                              { ...paginationTableProps }

                              keyField="id"
                              columns={ columns }
                              data={ data }

                              bootstrap4={true}
                              bordered={false}
                              hover={true}

                              wrapperClasses="table-responsive-lg"
                            /*headerClasses="map-list-headers"*/
                              rowClasses="selectable-row"

                              /*
                              loading={ this.state.maps === null }
                              overlay={ overlayFactory({ spinner: true }) }
                              remote={{}}
                              */

                              noDataIndication="No users found"

                              defaultSorted = {[{
                                  dataField: 'name',
                                  order: 'asc'
                              }]}
                            />

                            <SizePerPageDropdownStandalone
                              { ...paginationProps }
                            />
                            <PaginationTotalStandalone
                              { ...paginationProps }
                            />
                            <PaginationListStandalone
                              { ...paginationProps }
                            />
                          </div>
                        )
                      }
                    </PaginationProvider>
                  </div>
                )
              }
            </ToolkitProvider>

        </Container>

        /*
        return  <MaterialTable title="Gema Maps" />
        */
    }
}
