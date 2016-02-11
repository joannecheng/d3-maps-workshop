// Why load topojson?

var width = 960;
var height = 500;

// First, let's create an svg container
var svg = d3.select("#map_container")
  .append("svg");

// Next, let's create a 'g' container
// for our basemap. I have a rule to
// create a new JavaScript variable
// for each 'g' element I create. This helps
// me keep track of all the svg groups I have

var baseMapSVG = svg.attr({
  width: width,
  height: height
})
  .append("g")
  .classed("map", true);

// Next, create a projection object
// A projecton object translates points on a sphere
// to a 2d representation. Here, we're using the albers usa
// projection. This is meant to display the United states
// with hawaii and alaska in the lower left corner, scaled down

var projection = d3.geo.albersUsa();

// Path generator
// Geo Path generators work similarly to regular path generators in D3 (like d3.svg.line or d3.svg.area).
// It returns the 'd' attribute for a 'path' element, which describes the points and shape of a svg path.
// The difference is that they can handle any type of geojson feature
var path = d3.geo.path()
  .projection(projection);

d3.json("us.json", function(err, data) {
  // Exploring the topojson object
  // We have land, states, and counties. What does it look like to plot each?
  console.log(data.objects);
  // Plot the outline
  baseMapSVG.append("path")
    .datum(topojson.feature(data, data.objects.land))
    .attr({ class: 'land-boundary', d: path});

  // Let's plot states
  baseMapSVG.append("path")
    .datum(topojson.feature(data, data.objects.states))
    .attr({ class: 'state-boundary', d: path});

  // Let's plot counties
  baseMapSVG.append("path")
    .datum(topojson.feature(data, data.objects.counties))
    .attr({ class: 'county-boundary', d: path});
});
