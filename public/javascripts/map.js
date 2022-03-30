goongjs.accessToken = mapToken;
const lng = field.geometry.coordinates[1], lat = field.geometry.coordinates[0];
var map = new goongjs.Map({
    container: 'map', // container id
    style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
    center: [lng, lat], // starting position [lng, lat]
    zoom: 14 // starting zoom
});

var marker = new goongjs.Marker()
    .setLngLat([lng, lat])// position add marker [lng, lat]
    .addTo(map);
