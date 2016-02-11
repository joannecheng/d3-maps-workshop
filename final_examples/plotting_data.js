var width = 960;
var height = 600;

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

// We need to use an exponential scale
// because magnitude rating is on an exponential scale
// add this later
var radiusScale = d3.scale.pow()
  .range([1, 10])
  .domain([1, 10]);

d3.json("us.json", function(err, data) {
  // Lets plot states
  baseMapSVG.append("path")
    .datum(topojson.feature(data, data.objects.states))
    .attr({ class: 'state-boundary', d: path});

  // Now let's plot points - let's use earthquake data
  d3.csv("1.0_week.csv", function(err, earthquakeData) {
    console.log(earthquakeData);
    var earthquakeMarkers= svg.append("g")
      .attr({class: "markers"});

    earthquakeMarkers.selectAll("circle.earthquake-marker")
      .data(earthquakeData).enter()
      .append("circle")
      .attr({
        r: 1,
        cx: 0,
        cy: 0,
        transform: function(d) {
          // use the projection function to pass in an array of coordinates and return the x,y coordinates to plot this thing on a map
          var coordinates = projection([parseFloat(d.longitude), parseFloat(d.latitude)]);
          return "translate("+ coordinates +")"
        },
        class: 'earthquake-marker'
      })
    // Adding mouse events
    .on("mouseover", function(d) {
      console.log(d.place);
    });
  });
});

// Size of circle = M scale of 
// What else can we do to improve this map?
