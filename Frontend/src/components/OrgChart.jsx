import React, { Component } from 'react';
import OrgChart from '@balkangraph/orgchart.js/orgchart';
import './OrgChart.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

class OrgChartComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.editHandler = this.editHandler.bind(this);
    }

    componentDidMount()
    {
        setTimeout(async () =>
        {
            const { nodes } = this.props;
            console.log(this.props);
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
            this.chart = new OrgChart(document.getElementById('orgchart'), {
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
                nodeMenu: {
                    call: {
                        icon: '<svg width="24" height="24" viewBox="0 0 528.899 528.899"><path fill="#7A7A7A" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" /></svg>',
                        text: 'Edit',
                        onClick: this.editHandler,
                    },
                },
                tags,
                scaleInitial: OrgChart.match.boundary,
                levelSeparation: 25,
                siblingSeparation: 15,
            });

            this.chart.on('exportstart', (semder, args) =>
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
                    args.nodes = newNodes;
                }
            });

            this.chart.editUI.on('field', (sender, args) =>
            {
                if (['Add new field', 'isAssistant', 'bigBrotherYear'].includes(args.name))
                {
                    return false;
                }
                return true;
            });
        }, 1000);
    }

    shouldComponentUpdate()
    {
        return false;
    }

    editHandler(nodeId)
    {
        //const nodeData = this.chart.get(nodeId);
        //this.props.history.push({ pathname: '/bylaws' });
        console.log(this.props);
        //useHistory().push('/bylaws');
        window.location.href = '/Bylaws';
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
