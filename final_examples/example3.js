var points = [
  { size: 10, position: 1 },
  { size: 25, position: 4 },
  { size: 14, position: 5 },
  { size: 40, position: 10 }
];

var width = 600;
var height = 600;
var padding = 50;

var xScale = d3.scale.linear()
  .domain([0, d3.max(points, function(d) { return d.position })])
  .range([50, width - 50])

d3.select("#example_3 svg")
  .attr({width: width, height: height })
  .append("g")
  .classed("bubbles", true)
  .selectAll("circle.bubble")
  .data(points).enter()
  .append("circle")
  .attr({
    r: function(d) { return d.size },
    cx: function(d) { return xScale(d.position) },
    cy: height/2
  })
