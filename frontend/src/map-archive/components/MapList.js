/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import BootstrapTable from 'react-bootstrap-table-next';
/* import overlayFactory from 'react-bootstrap-table2-overlay'; */
import paginationFactory, { PaginationProvider,
                            PaginationListStandalone,
                            PaginationTotalStandalone,
                            SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

export default class MapList extends React.Component
{
    state = {}

    componentDidMount()
    {
        let self = this;
        fetch("http://localhost:12345/maps").then(function(_response){
            _response.json().then(function(_result){
                self.setState({maps: _result});
            });
        });
    }

    handleRowSelection(_selectedRow, _isSelect, _rowIndex, _event)
    {
        this.props.onMapSelection(_selectedRow.id);
    }


    formatDownloadUrl(_cell, _row, _rowIndex, _formatExtraData)
    {
        return <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip>Download latest revision</Tooltip>}
            ><Button
        onClick={function(_event){
                     alert("You downloaded " + _row.name + " in revision " + _row.revision);
                     _event.stopPropagation();
                 }}
        className="action-button"
            ><FontAwesomeIcon icon={faDownload} />
        </Button>
            </OverlayTrigger>;
    }

    render()
    {
        const columns = [{
            text: 'Name',
            dataField: 'name',

            sort: true,
            searchable: true,

            headerAlign: 'center',
            headerClasses: 'col-8'
        },{
            text: 'Revision',
            dataField: 'revision',

            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2'
        },{
            text: 'Actions',
            dataField: 'id',

            sort: false,
            searchable: false,

            formatter: this.formatDownloadUrl.bind(this),

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2',
            style: {
                padding: 0,
                verticalAlign: "middle"
            }
        }];

        const data = this.state.maps ? this.state.maps : [];
        console.log("maps", data);

        const paginationOption = {
            custom: true,
            totalSize: data.length
        };

        return <Container>

            <ToolkitProvider
               keyField="id"
               data={ data }
               columns={ columns }
               search>
              {
                props => (
                  <div>
                    <SearchBar { ...props.searchProps } placeholder="Search maps"/>
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
                              headerClasses="map-list-headers"
                              rowClasses="selectable-row"

                              /*
                              loading={ this.state.maps === null }
                              overlay={ overlayFactory({ spinner: true }) }
                              remote={{}}
                              */

                              noDataIndication="No maps found"

                              selectRow={{
                                mode: 'checkbox',
                                clickToSelect: true,
                                hideSelectColumn: true,
                                style: { background: "#fffaaa" },
                                onSelect: this.handleRowSelection.bind(this)
                              }}

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
