var width = 960;
var height = 600;

var svg = d3.select("#map_container")
  .append("svg")
var baseMapSVG = svg.attr({ width: width, height: height})
  .append("g")
  .classed("map", true)

var projection = d3.geo.albersUsa()
var path = d3.geo.path()
  .projection(projection);

d3.json("us.json", function(err, data) {
  d3.csv("all_poverty.csv", function(err, povertyData) {
    // Draw choropleth map here
  });
});
