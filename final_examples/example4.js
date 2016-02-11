var points = [
 66, 33, 31, 87, 40, 8, 97, 51,
 21, 26, 75, 99, 65, 62, 49, 36,
 52, 14, 77, 27, 15, 80, 22
]

var width = 600
var height = 600

var pathGenerator = d3.svg.line()
  .x(function(d, i) { return (i+1)*10 })
  .y(function(d) { return height/2 - d })

d3.select("#example_4 svg")
  .attr({ width: width, height: height })
  .append("path")
  .attr({
    fill: "none",
    stroke: "black",
    "stroke-width": 2
  })
  .attr("d", pathGenerator(points))
