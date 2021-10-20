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

export default class MapScoreList extends React.Component
{
    state = {}

    componentDidMount()
    {
        let self = this;
        fetch("http://localhost:12345/map-scores").then(function(_response){
            _response.json().then(function(_result){
                self.setState({mapScores: _result});
            });
        });
    }

    handleRowSelection(_selectedRow, _isSelect, _rowIndex, _event)
    {
        //this.props.onMapSelection(_selectedRow.id);
    }

    render()
    {
        const columns = [{
            text: 'Rank',
            dataField: 'rank',

            sort: false,
            searchable: false,

            headerAlign: 'center',
            headerClasses: 'col-1'
        }/*,{
            text: 'Score Time',
            dataField: 'milliseconds',

            sort: false,
            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2'
        },{
            text: 'Player',
            dataField: 'playerId',

            sort: false,
            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-3'
        },{
            text: 'Weapon',
            dataField: 'weaponId',

            sort: false,
            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2'
        },{
            text: 'Team',
            dataField: 'teamId',

            sort: false,
            searchable: false,

            //formatter: this.formatDownloadUrl.bind(this),

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2',
            style: {
                padding: 0,
                verticalAlign: "middle"
            }
        },{
            text: 'Created at',
            dataField: 'createdAt',

            sort: true,
            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-2'
        }*/];

        let data = this.state.mapScores ? this.state.mapScores : [];
        /*
        data = [{
            id: 1,
            rank: 1
        }];
         */
        console.log(data.length, data);

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
                            <SearchBar { ...props.searchProps } placeholder="Search map scores"/>
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
                                                //headerClasses="map-score-list-headers"
                                                rowClasses="selectable-row"

                                                /*
                                                loading={ this.state.maps === null }
                                                overlay={ overlayFactory({ spinner: true }) }
                                                remote={{}}
                                                */

                                                noDataIndication="No map scores found"

                                                selectRow={{
                                                    mode: 'checkbox',
                                                    clickToSelect: true,
                                                    hideSelectColumn: true,
                                                    style: { background: "#fffaaa" },
                                                    onSelect: this.handleRowSelection.bind(this)
                                                }}

                                                defaultSorted = {[{
                                                    dataField: 'rank',
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
