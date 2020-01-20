function init() {
  var communityconnectorURL = 'https://docs.google.com/spreadsheets/d/1W-popwonwLeqzMbuiP9LX0oR-swL8xcG3Ju4WEzR6B8/edit?usp=sharing';

  Tabletop.init( { key: communityconnectorURL,
    callback: addPoints,
    simpleSheet: true } );  // simpleSheet assumes there is only one table and automatically sends its data
}
window.addEventListener('DOMContentLoaded', init);

// Create a new Leaflet map centered on London!
var map = L.map('map').setView([51.5, 0.1], 9);

// This is the OSM basemap
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
});
basemap.addTo(map);

var sidebar = L.control.sidebar({
  container: 'sidebar',
  closeButton: true,
  position: 'left'
}).addTo(map);

panelID = 'my-info-panel'
var panelContent = {
  id: panelID,
  tab: '<i class="fa fa-bars active"></i>',
  pane: '<p id="sidebar-content"></p>',
  title: '<h2 id="sidebar-title">No state selected</h2>',
};
sidebar.addPanel(panelContent);

map.on('click', function (feature, layer) {
  sidebar.close(panelID);
});

var pointGroupLayer;

// addPoints is a bit simpler, as no GeoJSON is needed for the points
// It does the same check to overwrite the existing points layer once the Google Sheets data comes along
function addPoints(data) {
  if (pointGroupLayer != null) {
    pointGroupLayer.remove();
  }
  pointGroupLayer = L.layerGroup().addTo(map);

  for(var row = 0; row < data.length; row++) {
    var marker = L.marker([data[row].Latitude, data[row].Longitude]).addTo(pointGroupLayer);

    // AwesomeMarkers is used to create fancier icons
    var icon = L.AwesomeMarkers.icon({
      icon: 'info-sign',
      iconColor: 'white',
      markerColor: 'red',
      prefix: 'glyphicon',
      extraClasses: 'fa-rotate-0'
    });
    marker.setIcon(icon);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////

function createPopupContent(feature) {

  // Initalise the container to hold the popup content - changed from html to marker
  var marker = '<div class="popup__content">';

  // Get the name
  if( feature.properties.name('Name')) {
    marker += '<h2 class="Name">' +feature.properties.name+ '</h2>';
  }

  // Get the full address
  if( feature.properties.address('Address')) {
    marker += '<p class="Address">' +feature.properties.address+ '</p>';
  }
  
  // Get the opening hours
  if( feature.properties.open('Opening Hours')) {
    marker += '<p class="Opening Hours">' +feature.properties.open+ '</p>';

  // Get the contact phone number
  if( feature.properties.phone('Phone')) {
    marker += '<p class="Phone">' +feature.properties.phone+ '</p>';

  // Get the contact email address
  if( feature.properties.email('Email')) {
    marker += '<p class="Email">' +feature.properties.email+ '</p>';

  // Get the full website address
  if( feature.properties.website('Website')) {
    marker += '<p class="Website">' +feature.properties.website+ '</p>';

// Get the wheelchair access information
  if( feature.properties.wheelchair('Wheelchair Access?')) {
    marker += '<p class="Wheelchair Access?">' +feature.properties.wheelchair+ '</p>';

// Get the wheelchair access information
  if( feature.properties.wheelchairinfo('Wheelchair Access - Description')) {
    marker += '<p class="Wheelchair Access - Description">' +feature.properties.wheelchairinfo+ '</p>';

// Get the disabled toilets information
  if( feature.properties.toilets('Disabled Toilets?')) {
    marker += '<p class="Disabled Toilets?">' +feature.properties.toilets+ '</p>';

// Get the WIFI
  if( feature.properties.wifi('WiFi?')) {
    marker += '<p class="WiFi?">' +feature.properties.wifi+ '</p>';

// Get the Smoking Area info
  if( feature.properties.smoking('Smoking Area?')) {
    marker += '<p class="Smoking Area?">' +feature.properties.smoking+ '</p>';

// Get the child area info
  if( feature.properties.child('Children Area?')) {
    marker += '<p class="Children Area?">' +feature.properties.child+ '</p>';

// Get the Outdoor seating info
  if( feature.properties.outdoor('Outdoor Seating?')) {
    marker += '<p class="Outdoor Seating?">' +feature.properties.outdoor+ '</p>';

// Get the food info
  if( feature.properties.food('Food?')) {
    marker += '<p class="Food?">' +feature.properties.food+ '</p>';

// Get the cuisine info
  if( feature.properties.cuisine('Cuisine')) {
    marker += '<p class="Cuisine">' +feature.properties.cuisine+ '</p>';

// Get any additional info
  if( feature.properties.extra('Additional Comments?')) {
    marker += '<p class="Additional Comments?">' +feature.properties.extra+ '</p>';

  marker += '</div>'; // End .popup__content
  return html;
}

function queryMarker(feature, layer) {

  /*
     * Bind a new popup to each Feature and call a custom
     * function to create the popup content
   */
  layer.bindPopup(createPopupContent(feature));
}

L.geoJSON(markers, {
    onEachFeature: queryMarker
}).addTo(mymap);