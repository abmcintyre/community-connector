/*Script to display data from Google Sheets as point and polygon layers using Leaflet - The Sheets are then imported using Tabletop.js and overwrite the initially laded layers
 */
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

    // UNCOMMENT THIS LINE TO USE POPUPS
    //marker.bindPopup('<h2>' + data[row].location + '</h2>There's a ' + data[row].level + ' ' + data[row].category + ' here');

    // COMMENT THE NEXT 14 LINES TO DISABLE SIDEBAR FOR THE MARKERS
    // marker.feature = {
    //   properties: {
    //    Name: data[row].Name,
    //     Hours: data[row].Hours      }
    // };
    // marker.on({
    //   click: function(e) {
    //     L.DomEvent.stopPropagation(e);
    //     document.getElementById('sidebar-title').innerHTML = e.target.feature.properties.Name;
    //     document.getElementById('sidebar-content').innerHTML = e.target.feature.properties.Hours;
    //     sidebar.open(panelID);
    //   }
    // });

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
  if( feature.properties.Name('Name')) {
    marker += '<h2 class="Name">' +feature.properties.Name+ '</h2>';
  }

  // Get the full address
  if( feature.properties.Address('Address')) {
    marker += '<p class="Address">' +feature.properties.Address+ '</p>';
  }
  
  // Get the opening hours
  if( feature.properties.Opening_Hours('Opening Hours')) {
    marker += '<p class="Opening Hours">' +feature.properties.Opening_Hours+ '</p>';

  // Get the contact phone number
  if( feature.properties.Phone('Phone')) {
    marker += '<p class="Phone">' +feature.properties.Phone+ '</p>';

  // Get the contact email address
  if( feature.properties.Email('Email')) {
    marker += '<p class="Email">' +feature.properties.Email+ '</p>';

  // Get the full website address
  if( feature.properties.Website('Website')) {
    marker += '<p class="Website">' +feature.properties.Website+ '</p>';

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





/* Style the marker popup html */
.site__name {
    margin: 0 0 .8em 0;
}

.site__address {
    font-size: 1.3em;
}

.site__availability {
    max-width: 16em;
}

.site__availability ul {
    padding: 0;
    margin: 0 0 1.5em;
    list-style: none;
}

.site__availability ul li {
    margin-bottom: .8em;
}

/* Property name */
.site__availability ul li span {
    font-size: 1.4em;
    font-weight: bold;
    line-height: 1.5;
}

/* Property value (icon) */
.site__availability__icon {
    width: 2em;
    float: right;
}