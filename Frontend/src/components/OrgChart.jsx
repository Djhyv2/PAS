import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrgChart from '../orgchart';
import './OrgChart.css';

class OrgChartComponent extends Component
{
    componentDidMount()
    {
        setTimeout(async () =>
        {
            const { nodes } = this.props;
            OrgChart.templates.ana.field_0 = '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="150" y="30" text-anchor="middle">{val}</text>';
            OrgChart.templates.ana.field_1 = '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="150" y="50" text-anchor="middle">{val}</text>';
            OrgChart.templates.ana.field_2 = '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="150" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.ana.field_3 = '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="150" y="90" text-anchor="middle">{val}</text>';
            OrgChart.templates.ana.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,275,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>';
            OrgChart.templates.ana.size = [300, 120];
            const tags = {};
            for (let i = 0; 25 >= i; i += 1)
            {
                tags[`subLevels${i}`] = { subLevels: i };
            }

            const chart = new OrgChart(document.getElementById('orgchart'), {
                nodes,
                nodeBinding: {
                    field_0: 'Name',
                    field_1: 'Status',
                    field_2: 'Staff Name',
                    field_3: 'Year',
                },
                searchFields: ['Name', 'Staff Name', 'Year', 'Status'],
                menu: {
                    pdf: { text: 'Export PDF' },
                    png: { text: 'Export PNG' },
                    csv: { text: 'Export CSV' },
                },
                tags,
                scaleInitial: OrgChart.match.boundary,
                levelSeparation: 25,
                siblingSeparation: 15,
            });

            chart.on('exportstart', (semder, args) =>
            {
                if ('csv' === args.ext)
                {
                    const newNodes = [];
                    for (let i = 0; i < args.nodes.length; i += 1)
                    {
                        newNodes.push({
                            Name: args.nodes[i].Name,
                            StaffName: args.nodes[i]['Staff Name'],
                            Year: args.nodes[i].Year,
                            Status: args.nodes[i].Status,
                            BigBrother: args.nodes[i]['Big Brother'],
                        });
                    }
                    //eslint-disable-next-line no-param-reassign
                    args.nodes = newNodes;
                }
            });
        }, 1000);
    }

    shouldComponentUpdate()
    {
        return false;
    }

    render()
    {
        return (
            <div id="orgchart" />
        );
    }
}

OrgChartComponent.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrgChartComponent;
