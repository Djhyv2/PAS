/// <reference path="d3.js" />
//https://codepen.io/augbog/pen/LEXZKK

let treeLayout, brotherData, brotherLinks, brotherHeirarchy, svg;
const duration = 750;//Duration of all transitions
const nodeMargin = 5;//Margin around nodes
const rectWidth = 70;
const rectHeight = 50;//Size of nodes
const nodeWidth = rectWidth + 2 * nodeMargin;
const nodeHeight = rectHeight + 2 * nodeMargin;//Size of nodes

$(document).ready(() => {
    const brotherJson = d3.csvParse($('#csvBrotherData').val());//Parse CSV to Json
    brotherHeirarchy = d3.stratify().id((brother) => brother.brotherID).parentId((brother) => brother.bigBrotherID)(brotherJson);//Parse JSON to heirarchy

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = 4096 - margin.left - margin.right;
    const height = 2048 - margin.top - margin.bottom;//Set dimensions of tree

    treeLayout = d3.tree()
        .nodeSize([nodeHeight, nodeWidth])//Order reversed to make a horizontal tree
        .separation((a, b) => a.parent == b.parent ? 1 : 1)//Can be used to make siblings closer than cousins

    treeLayout(brotherHeirarchy);//Calculates x,y values for all nodes based on size of canvas

    brotherData = brotherHeirarchy.descendants();//Gets array of all brothers
    flipData(brotherData);

    brotherLinks = brotherHeirarchy.links();//Gets array of all links from brothers

    svg = d3
        .select('.tree-container')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(d3.zoom().on("zoom", () => {
            svg.attr("transform", d3.event.transform)
        }))//Enables zooming and panning
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top}`);//Create graphic and base group in container


    brotherData.forEach(brother =>
    {
        brother.x0 = brother.x;
        brother.y0 = brother.y;
    });//Saves previous position of each node to be used for transitions

    drawLinks();
    drawNodes();
});//When Document Loaded

function collapse(brother)
{
    if (null != brother.children)
    {
        brother._children = brother.children;
        brother.children = null;
    }
    else
    {
        brother.children = brother._children;
        brother._children = null;
    }
    updateGraph(brother);
}//Will swap children from being active or not and then update tree

function updateGraph(brother)
{
    treeLayout(brotherHeirarchy);//Recalculates x and y positions
    brotherData = brotherHeirarchy.descendants();//Gets array of all brothers
    flipData(brotherData)
    brotherLinks = brotherHeirarchy.links();//Gets array of all links from brothers

    drawLinks();
    drawNodes();
    //Will draw nodes/links with current data and remove any not found in the heirarchy
}

function drawLinks()
{
    let links = svg
        .selectAll('.link')
        .data(brotherLinks, brother => brother.brotherID);//Binds data
    

    links
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', brotherLink => d3.linkHorizontal()({
            source: [brotherLink.source.x + rectWidth + nodeMargin, brotherLink.source.y + rectHeight / 2 + nodeMargin],//Source is right edge middle
            target: [brotherLink.target.x + nodeMargin, brotherLink.target.y + rectHeight / 2 + nodeMargin]//Target is left edge middle
            //Both source and target are 0,0 at top left corner
        }))
        .attr('fill', 'none')
        .attr('stroke', '#bbb');//Creates bezier curved lines between nodes

    links
        .exit()
        .remove();///Will remove all extra links
}

function drawNodes()
{
    let nodes = svg
        .selectAll('.node')
        .data(brotherData, brother => brother.brotherID)


    let nodesEntered = nodes
        .enter()
        .append('rect')
        .attr('class', 'node')
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("opacity", .5)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr('x', brother => brother.x + nodeMargin)
        .attr('y', brother => brother.y + nodeMargin)//Creates rects and assigns attributes to all nodes
        .on('click', collapse);
    //Does work on newly entered

    nodes.merge(nodesEntered)
        .attr("fill", brother =>
        { return brother.children ? "#005b9a" : brother._children ? "#149ddf" : "#808080" });//Dark Blue if children, Light Blue if collapsed, Grey if neither
    //Merges new and existing nodes to perform updates

    nodes
        .exit()
        .remove();///Will remove all extra nodes

}
 
function flipData(brotherData)
{
    brotherData.forEach(brother =>
        {
            const temp = brother.x;
            brother.x = brother.y;
            brother.y = temp;
        }
    )
}//Swaps the x and y coordinates to make tree horizontal