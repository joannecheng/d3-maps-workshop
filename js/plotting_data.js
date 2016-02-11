var width = 960;
var height = 600;

var svg = d3.select("#map_container")
  .append("svg")
var baseMapSVG = svg.attr({ width: width, height: height})
  .append("g")
  .classed("map", true)

var projection = d3.geo.albersUsa();
var path = d3.geo.path()
  .projection(projection);

d3.json("us.json", function(err, data) {
  // Let's just plot states
  baseMapSVG.append("path")
    .datum(topojson.feature(data, data.objects.states))
    .attr({ class: 'state-boundary', d: path});

  d3.csv("1.0_week.csv", function(err, earthquakeData) {
    // how do we plot points?
  });
});

// Size of circle = M scale of 
// What else can we do to improve this map?
