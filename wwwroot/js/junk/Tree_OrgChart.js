/// <reference path="d3.js" />
//https://blockbuilder.org/tejaser/55c43b4a9febca058363a5e58edbce81
//https://codepen.io/EleftheriaBatsou/pen/LmddvN
//https://github.com/bumbeishvili/d3-organization-chart

let treeLayout, brotherData, brotherLinks, brotherHeirarchy, svg, linkGenerator;
const duration = 750;//Duration of all transitions

$(document).ready(() =>
{
    const brotherJson = d3.csvParse($('#csvBrotherData').val());//Parse CSV to Json

    new TreeChart()
        .container(".tree-container") // node or css selector
        .data(brotherJson)
        .svgWidth(4096)
        .initialZoom(0.4)
        .onNodeClick(d => console.log(d + ' node clicked'))
        .render();

});