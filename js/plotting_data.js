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

var radiusScale = d3.scale.pow()
  .domain([1, 5])
  .range([2, 10])

d3.json("us.json", function(err, data) {
  // Let's just plot states
  baseMapSVG.append("path")
    .datum(topojson.feature(data, data.objects.states))
    .attr({ class: 'state-boundary', d: path});

  d3.csv("1.0_week.csv", function(err, earthquakeData) {
    baseMapSVG
      .selectAll("circle.earthquake-marker")
      .data(earthquakeData).enter()
      .append("circle")
      .attr({
        r: function(d) {
          return radiusScale(d.mag)
        },
        'opacity': 0.4,
        fill: '#d03030',
        stroke: '#d03030',
        transform: function(d) {
          var coordinates = projection([parseFloat(d.longitude), parseFloat(d.latitude)])
          if (coordinates !== null) {
            return "translate(" + coordinates + ")";
          }
          else {
            d3.select(this).attr("r", 0);
          }
        }
      })
  });
});
