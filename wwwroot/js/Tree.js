/// <reference path='d3.js' />
//https://codepen.io/augbog/pen/LEXZKK

let treeLayout, brotherData, brotherLinks, brotherHeirarchy, svg;
const duration = 750;//Duration of all transitions
const nodeMargin = 3;//Margin around nodes
const rectWidth = 155;
const rectHeight = 19;//Size of content of nodes
const nodeWidth = rectWidth + 2 * nodeMargin;
const nodeHeight = rectHeight + 2 * nodeMargin;//Size of nodes
const rectInnerBorderWidth = 1;//Border on content of nodes
const translateBorder = 100;//Border around graph you can translate to

$(document).ready(() =>
{
    const brotherJson = d3.csvParse($('#csvBrotherData').val());//Parse CSV to Json
    brotherHeirarchy = d3.stratify().id((brother) => brother.brotherID).parentId((brother) => brother.bigBrotherID)(brotherJson);//Parse JSON to heirarchy



    treeLayout = d3.tree()
        .nodeSize([nodeHeight, nodeWidth])//Order reversed to make a horizontal tree
        .separation((a, b) => a.parent == b.parent ? 1 : 1)//Can be used to make siblings closer than cousins

    treeLayout(brotherHeirarchy);//Calculates x,y values for all nodes based on size of canvas

    brotherData = brotherHeirarchy.descendants();//Gets array of all brothers
    flipData(brotherData);

    brotherLinks = brotherHeirarchy.links();//Gets array of all links from brothers

    let minX= 0, maxX = 0, minY = 0, maxY = 0;
    brotherData.forEach(brother =>
    {
        minX = Math.min(minX, brother.x);
        maxX = Math.max(maxX, brother.x);
        minY = Math.min(minY, brother.y);
        maxY = Math.max(maxY, brother.y);
    });//Finds min/max values to set translate extent

    svg = d3
        .select('.tree-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100vh')
        .call(d3.zoom()
            .scaleExtent([.5, 2])
            //.translateExtent([minX - translateBorder, minY - translateBorder], [maxX + translateBorder, maxY + translateBorder])
            .on('zoom', () =>
            {
                svg.attr('transform', `translate(${Math.max(0, Math.min(d3.event.transform.x + minX, maxX - minX - d3.event.transform.k * 50))},${Math.max(0, Math.min(d3.event.transform.y, maxY - minY - d3.event.transform.k * 50))})scale(${d3.event.transform.k})`);
                //svg.attr('transform', d3.event.transform);
            }))//Enables zooming and panning
        .append('g');//Create graphic and base group in container


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
        .append('g')
        .attr('class', 'node');//Creates group with node class

    nodesEntered
        .append('rect')
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('opacity', 1)
        .attr('stroke', 'black')
        .attr('stroke-width', rectInnerBorderWidth)
        .attr('x', brother => brother.x + nodeMargin)
        .attr('y', brother => brother.y + nodeMargin)
        .on('click', collapse);//Creates rects

    nodesEntered
        .append('foreignObject')
        /*.attr('x', brother => brother.x + nodeMargin + rectInnerBorderWidth)
        .attr('y', brother => brother.y + nodeMargin + rectInnerBorderWidth)
        .attr('height', rectHeight - 2 * rectInnerBorderWidth)
        .attr('width', rectWidth - 2 * rectInnerBorderWidth)*/
        .attr('x', brother => brother.x + nodeMargin)
        .attr('y', brother => brother.y + nodeMargin)
        .attr('height', rectHeight)
        .attr('width', rectWidth)
        .on('click', collapse)
        .append('xhtml:body')
        .style('font-size', '6px')
        .style('background', 'transparent')
        .style('padding', `${rectInnerBorderWidth}px`)
        .html(brother => `<p>${brother.data.name} (${brother.data.year})<br/>${brother.data.status} ${brother.data.staffName}</p>`);//Creates html p tag


    nodes
        .exit()
        .remove();///Destroys extras


    nodes = svg
        .selectAll('.node rect')
        .attr('fill', brother => { return brother.children ? '#398ff0' : brother._children ? '#aecef2' : '#808080' });//Dark Blue if open children, Light Blue if collapsed children, Grey if neither
}

function flipData(brotherData)
{
    brotherData.forEach(brother =>
    {
        const temp = brother.x;
        brother.x = brother.y;
        brother.y = temp;
    })
}//Swaps the x and y coordinates to make tree horizontal