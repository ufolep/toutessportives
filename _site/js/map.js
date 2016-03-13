// call map
var map = L.map('map').setView([47.004615, 4.135002], 6.5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ufolep.pbcmc6jj', 
    accessToken: 'pk.eyJ1IjoidWZvbGVwIiwiYSI6ImNpbGg2OWF1cDAwNGt3Z200YWloeTVhMDEifQ.LTfVHg4Q33WokTQQ4TNTSQ'
}).addTo(map);

var comiteIcon = L.icon({
                iconUrl: '/images/pinComites.svg',
                iconSize: [48, 50] 
              });
function popUp(feature, layer) {
  string = ''
  if (feature.properties.COMITE) string += '<p><b>' + feature.properties.COMITE + '</b></p>'
  if (feature.properties.ADRESSE) string += '<p>' + feature.properties.ADRESSE + '</p>'
  if (feature.properties.CODEPOSTAL) string += '<p>' + feature.properties.CODEPOSTAL + '</p>'
  if (feature.properties.VILLE) string += '<p>' + feature.properties.VILLE + '</p>'
  if (feature.properties.SITEWEB) string += '<p><a href="' + feature.properties.SITEWEB + '">' + feature.properties.SITEWEB + '</a></p>'
  layer.bindPopup(string)
}

// call json
var geojsonLayerComite = new L.GeoJSON.AJAX("/json/Comites.json/json/Comites.json",
  {
      onEachFeature: popUp,
      pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: comiteIcon })
      }
  });
var checkboxesJson = {
  "Comités départementaux": geojsonLayerComite
};
L.control.layers(null,checkboxesJson,{collapsed:false}).addTo(map);