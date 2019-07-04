/// <reference path="d3.js" />
//https://blockbuilder.org/tejaser/55c43b4a9febca058363a5e58edbce81
//https://codepen.io/EleftheriaBatsou/pen/LmddvN

let treeLayout, brotherData, brotherLinks, brotherHeirarchy, svg, linkGenerator;
const duration = 750;//Duration of all transitions

$(document).ready(() => {
    const brotherJson = d3.csvParse($('#csvBrotherData').val());//Parse CSV to Json
    brotherHeirarchy = d3.stratify().id((brother) => brother.brotherID).parentId((brother) => brother.bigBrotherID)(brotherJson);//Parse JSON to heirarchy

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = 4096 - margin.left - margin.right;
    const height = 2048 - margin.top - margin.bottom;//Set dimensions of tree

    treeLayout = d3.tree().size([height, width]);//Order reversed to make a horizontal tree
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

    linkGenerator = d3.linkHorizontal()
        .x(brother => brother.x)
        .y(brother => brother.y);//Will generate bezier curve from coordinates, is flipped due to tree being horizontal

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
        .data(brotherLinks, brother => brother.brotherID);

    links
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', brotherLink => linkGenerator(brotherLink))
        .attr('fill', 'none')
        .attr('stroke', '#bbb');//Creates bezier curved lines between nodes

    links
        .exit()
        .remove();///Will translate and remove all extra links
}

function drawNodes()
{
    let nodes = svg
        .selectAll('.node')
        .data(brotherData, brother => brother.brotherID)


    nodes
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('cx', brother => brother.x)
        .attr('cy', brother => brother.y)
        .attr('r', 5)//Creates circle and assigns attributes to all nodes
        .on('click', collapse);

    nodes
        .exit()
        .remove();///Will translate and remove all extra nodes

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