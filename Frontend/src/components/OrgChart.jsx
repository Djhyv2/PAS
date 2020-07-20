import React, { Component } from 'react';
import OrgChart from '@balkangraph/orgchart.js/orgchart';
import './OrgChart.css';
import PropTypes from 'prop-types';

class OrgChartComponent extends Component
{
    componentDidMount()
    {
        setTimeout(async () =>
        {
            const { nodes } = this.props;
            OrgChart.templates.ana.field_0 = '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
            OrgChart.templates.ana.field_1 = '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
            OrgChart.templates.ana.field_2 = '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.ana.field_3 = '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
            const tags = {};
            for (let i = 0; 25 >= i; i += 1)
            {
                tags[`subLevels${i}`] = { subLevels: i };
            }
            const chart = new OrgChart(document.getElementById('orgchart'), {
                nodes,
                nodeBinding: {
                    field_0: 'Name',
                    field_1: 'Year',
                    field_2: 'Staff Name',
                    field_3: 'Status',
                },
                searchFields: ['Name', 'Staff Name', 'Year', 'Status'],
                menu: {
                    pdf: { text: 'Export PDF' },
                    png: { text: 'Export PNG' },
                    csv: { text: 'Export CSV' },
                },
                tags,
                scaleInitial: OrgChart.match.boundary,
                levelSeparation: 20,
                subtreeSeparation: 30,
                siblingSeparation: 15,
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
