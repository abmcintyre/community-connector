/*Script to display two tables from Google Sheets as point and polygon layers using Leaflet - The Sheets are then imported using Tabletop.js and overwrite the initially laded layers
 */
function init() {
  //var workshop1URL = 'https://docs.google.com/spreadsheets/d/17EVLKmK7-52xxPOZUPLp1DiOfY33WOZXrSHjGlZgcqI/edit?usp=sharing';
  var workshop2URL = 'https://docs.google.com/spreadsheets/d/1BaXZIexSQcNDk5lHwxdJJ7ta1lSncUex6eaSvHFQrhQ/edit?usp=sharing';

  Tabletop.init( { key: workshop2URL,
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
    //   	Name: data[row].Name,
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

// Get the about information
	if( feature.properties.About('About')) {
		marker += '<p class="About">' +feature.properties.About+ '</p>';

	// Get the full address
	if( feature.properties.Address('Address')) {
		marker += '<p class="Address">' +feature.properties.Address+ '</p>';
	}
	
	// Get the full address
	if( feature.properties.address('Address')) {
		marker += '<p class="Address">' +feature.properties.Address+ '</p>';

	// Get the full address
	if( feature.properties.address('Address')) {
		marker += '<p class="Address">' +feature.properties.Address+ '</p>';

	// Get the full address
	if( feature.properties.address('Address')) {
		marker += '<p class="Address">' +feature.properties.Address+ '</p>';

	// Get the full address
	if( feature.properties.address('Address')) {
		marker += '<p class="Address">' +feature.properties.Address+ '</p>';

	// Shoes
	if( feature.properties.hasOwnProperty('shoes')) {
		html += '<li><span>Shoes:</span>' + getAvailabilityIcon(feature.properties.shoes) + '</li>';
	}

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