// Why load topojson?

var width = 960;
var height = 500;

// First, let's create an svg container

var svg = d3.select("#map_container")
  .append("svg")
var baseMapSVG = svg.attr({ width: width, height: height})
  .append("g")
  .classed("map", true)

// Next, create a projection object
// A projecton object translates points on a sphere
// to a 2d representation. Here, we're using the albers usa
// projection. This is meant to display the United states
// with hawaii and alaska in the lower left corner, scaled down

var projection = d3.geo.albersUsa();

// Path generator
var path = d3.geo.path()
  .projection(projection);

d3.json("us.json", function(err, data) {
  // Lets plot states
  baseMapSVG.append("path")
    .datum(topojson.feature(data, data.objects.states))
    .attr({ class: 'state-boundary', d: path});

  // Now let's plot points - let's use earthquake data
  d3.csv("1.0_month.csv", function(err, earthquakeData) {
    var earthquakeMarkers= svg.append("g")
      .attr({class: "markers"});
    var coordinates = earthquakeData.map(function(d) {
      console.log(d.longitude, d.latitude);
      return projection([parseFloat(d.longitude), parseFloat(d.latitude)]) || [0, 0];
    });
    console.log(coordinates);

    earthquakeMarkers.selectAll("circle.earthquake-marker")
      .data(coordinates).enter()
      .append("circle")
      .attr({
        r: 1,
        cx: 0,
        cy: 0,
        opacity: 0.4,
        transform: function(d) { return "translate("+ d +")" },
        class: 'earthquake-marker'
      });
  });
});

// For now, we're going to use the json file from
// http://bl.ocks.org/mbostock/4090848
// http://bl.ocks.org/mbostock/raw/4090846/us.json
// https://www.census.gov/geo/maps-data/data/cbf/cbf_state.html

