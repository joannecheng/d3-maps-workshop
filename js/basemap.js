var width = 960;
var height = 500;

var svg = d3.select("#map_container svg")
  .attr({ width: width, height: height })

var basemapSVG = svg.append("g")
  .attr("class", "basemap")

var projection = d3.geo.albersUsa();
var path = d3.geo.path()
  .projection(projection)

d3.json("us.json", function(err, data) {
  console.log(data);
  // Plot the outline
  basemapSVG.append("path")
    .datum(topojson.feature(data, data.objects.land))
    .attr({ class: 'land-boundary', d: path});

  basemapSVG.append("path")
    .datum(topojson.feature(data, data.objects.states))
    .attr({ class: 'states', d: path,
    fill: 'none', stroke: '#fff' })

  basemapSVG.append("path")
    .datum(topojson.feature(data, data.objects.counties))
    .attr({ class: 'states', d: path,
    fill: 'none', stroke: '#fff', 'stroke-width': 0.5})
});
