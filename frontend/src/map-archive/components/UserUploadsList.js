/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import React from 'react';
import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import BootstrapTable from 'react-bootstrap-table-next';
/* import overlayFactory from 'react-bootstrap-table2-overlay'; */
import filterFactory, { Comparator, dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory, { PaginationProvider,
                            PaginationListStandalone,
                            PaginationTotalStandalone,
                            SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

export default class UserUploadsList extends React.Component
{
    state = {}

    componentDidMount()
    {
        if (this.props.hasOwnProperty("userId"))
        { // Only the uploads of the user



        }
        else
        { // All pending uploads
            
        }


        this.setState({
            data: [
                { id: 1, name: "gibbed-gema11", "revision": 27, "uploadDate": "2019-12-06", "status": "accepted", "uploader": "wesen" }
            ]
        });
    }

    handleRowSelection(_selectedRow, _isSelect, _rowIndex, _event)
    {
        this.props.onMapSelection(_selectedRow.id);
    }



    generateTableColums()
    {
        let columns = [{
            text: 'Name',
            dataField: 'name',

            sort: true,
            searchable: true,
//            filter: textFilter(),

            headerAlign: 'center',
            //headerClasses: 'col-6'
        },{
            text: 'Revision',
            dataField: 'revision',
            searchable: false,

            headerAlign: 'center',
            align: 'center',
            headerClasses: 'col-1'
        },/*{
            text: 'Description',
            dataField: 'description',
            searchable: true,

            headerAlign: 'center',

            headerClasses: 'col-3'
        }*/,{
            text: 'Upload Date',
            dataField: 'uploadDate',
            type: 'date',

            headerClasses: 'col-2',

            headerAlign: 'center',
            align: 'center',

            sort: true,
            searchable: false,
            /*
            filter: dateFilter({
                withoutEmptyComparatorOption: true,  // dont render empty option for comparator
                comparators: [Comparator.EQ],  // Custom the comparators
            })
            */
        },{
            text: 'Status',
            dataField: 'status',

            headerClasses: 'col-1',

            headerAlign: 'center',
            align: 'center',

            sort: true,
            searchable: false
        }];

        if (!this.props.hasOwnProperty("userId"))
        {
            /*
            // TODO:
            // Actions = accept, reject (if already accepted/rejected only one of the two possible to click)
            columns.unshift({
                text: 'Actions',
                dataField: 'status',

                headerAlign: 'center',
                align: 'center',

                headerClasses: 'col-2',
                style: {
                    padding: 0,
                    verticalAlign: "middle"
                }
            });
            */

            columns.splice(3, 0, {
                text: 'Uploader',
                dataField: 'uploader',

                headerClasses: 'col-2',

                headerAlign: 'center',
                align: 'center',

                sort: true,
                searchable: false,
                //filter: textFilter()
            });
        }

        return columns;
    }


    render()
    {
        const data = this.state.data ? this.state.data : [];

        const paginationOption = {
            custom: true,
            totalSize: data.length
        };

        let title;
        if (this.props.hasOwnProperty("userId"))
        {
            title = "Map Uploads of " + this.props.userId;
        }
        else title = "All Uploads";

        let columns = this.generateTableColums();
        return <Container>
            <ToolkitProvider
               keyField="id"
               data={ data }
               columns={ columns }
               search>
              {
                props => (
                  <div>
                    <SearchBar { ...props.searchProps } placeholder="Search uploads"/>
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
                              filter={ filterFactory() }
                              //filterPosition="top"
                              bootstrap4={true}
                              bordered={false}
                              hover={true}

                              wrapperClasses="table-responsive-lg"
                              headerClasses="user-upload-list-headers"
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
            </Container>;
    }
}
