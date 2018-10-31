require('../scss/main.scss');
const L = require('leaflet');

var coords = {"campus": [37.8691454, -122.26023129999999], 
              "northside": [37.8799328, -122.27161180000002],
              "southside": [37.8660179, -122.26162239999996],
              "downtown": [37.8692584, -122.26964229999999]};

// buttons 
var northside = document.getElementById("northside"),
    southside = document.getElementById("southside"),
    downtown = document.getElementById("downtown"),
    campus = document.getElementById("campus"); 

var btns = [northside, southside, downtown, campus]; 
var btn_container = document.getElementById('button-container');


btns.forEach(function(btn) {
  btn_container.appendChild(btn);
  btn.addEventListener("click", function() {
    var btnID = this.id;
    map.flyTo(coords[btnID], 16);
  })
})

window.$('.icon-facebook').click((e) => {
  e.preventDefault();
  const uri = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${uri}`);
});


window.$('.icon-twitter').click((e) => {
  e.preventDefault();
  const uri = window.location.href;
  const status = encodeURIComponent(`${window.tweetText} ${uri}`);
  window.open(`https://twitter.com/home?status=${status}`);
});

// https://gist.github.com/mathewbyrne/1280286
function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

var map = L.map('map').setView([37.871470, -122.260363], 15);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

const pollLocations = require('../data/polling_locations.json');
for (var i = 0; i < pollLocations.length; i++) {
    var poll = pollLocations[i];
    var circle = L.circle([poll.lat, poll.lon], {
        color: '#8B008B',
        fillColor: '#8B008B',
        fillOpacity: 0.5,
        radius: 15
    }).addTo(map);

    circle.bindPopup(poll.locname);
    circle.on('mouseover', function (e) {
        this.openPopup();
    });
    circle.on('mouseout', function (e) {
        this.closePopup();
    });
}
