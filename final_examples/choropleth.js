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
    // Define color scale to color in the counties
    var colorScale = d3.scale.linear()
      .domain([0, d3.max(povertyData, function(d) {
        return parseFloat(d.poverty_percent)
      })])
      .range(["#FFF", "#0000A0"]);

    console.log(data.objects.counties);
    // we want 'county_id', 'poverty_percent'
    console.log(povertyData);
    var counties = baseMapSVG
      .selectAll('path.state-boundary')
      // rather than use a single topojson feature, we're going to pass in an
      // array of features and draw a path element for each
      // for each path element, we're going to set the fill color to a color in
      // the scale, depending on the value of 'poverty_percent'
      .data(topojson.feature(data, data.objects.counties).features).enter()
      .append('path')
      .attr({ class: 'county-boundary', d: path})
      .style('fill', function(d) {
        var matchingSet = povertyData.find(function(datum) {
          return parseInt(datum.county_id) === d.id;
        }) || {};

        return colorScale(matchingSet.poverty_percent);
      })


  });

});
