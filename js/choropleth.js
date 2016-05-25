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
    var colorScale = d3.scale.linear()
      .domain([0, 50])
      .range(["#FFF", "#0000A0"]);

    baseMapSVG
      .selectAll('path.county')
      .data(topojson.feature(data, data.objects.counties).features).enter()
      .append("path")
      .attr({ d: path,
        stroke: '#fff',
        'stroke-width': 0.5,
        fill: function(d) {
          var matchingSet = povertyData.find(function(datum) {
            return parseInt(datum.county_id) === d.id;
          }) || {};
          return colorScale(matchingSet['poverty_percent'])
        }
      })
      .on("mouseover", function(d) { console.log(d) })
  });
});
