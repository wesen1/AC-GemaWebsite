/**
 * @version 0.1
 * @author wesen <wesen-ac@web.de>
 * @copyright 2019 wesen
 * @license MIT
 */

import MaterialTable from 'material-table';
import React from 'react';

export default class MapRevisionList extends React.Component
{
    render()
    {
        return <MaterialTable

        title="Revisions"

        actions={[
            {
                icon: 'save_alt',
                tooltip: 'Download map revision',
                onClick: function(_event, _rowData){

                    // TODO: open Download URL
                    alert("You downloaded gibbed-gema11 in revision " + _rowData.revision);
                }
            }
        ]}

              columns={[
                { title: 'Revision', field: 'revision' },
                { title: 'Description of changes', field: 'changesDescription' },
                { title: 'Uploader', field: 'uploader' },
                { title: 'Upload Date', field: 'uploadDate', type: 'datetime' }
              ]}

          data={this.props.revisions}
            />;
    }
}
