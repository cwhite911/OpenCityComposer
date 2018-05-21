import {analyser, audio} from './audio';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiItb0dqdUlZIn0.4Zb1DGESXnx0ePxMVLihZQ';
export const map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/dark-v9',
              // center: [-78.9002, 35.9939],
  center: {
    lng: -74.00649562332922,
    lat: 40.70811328605049
  },
  zoom: 15,
  pitch: 55,
  bearing: -17.6,
  hash: false,
  container: 'map'
});

map.addControl(new mapboxgl.FullscreenControl());

    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    map.on('load', function() {
      var bins =20;
      var maxHeight = 80;
      var binWidth = maxHeight / bins;
      // Divide the buildings into 16 bins based on their true height, using a layer filter.
      for (var i = 0; i < bins; i++) {
          map.addLayer({
              'id': '3d-buildings-' + i,
              'source': 'composite',
              'source-layer': 'building',
              'filter': ['all', ['==', 'extrude', 'true'], ['>', 'height', i * binWidth], ['<=', 'height', (i + 1) * binWidth]],
              'type': 'fill-extrusion',
              'minzoom': 15,
              'paint': {
                  'fill-extrusion-color': '#aaa',
                  'fill-extrusion-height-transition': {
                      duration: 0,
                      delay: 0
                  },
                  'fill-extrusion-opacity': .6
              }
          });
      }
      var frequencyData = new Uint8Array(bins); //was 200
        var avg = 0;
        function funkyTown() {
          analyser.getByteFrequencyData(frequencyData);
          for (var i = 0; i < bins; i++) {
              avg += frequencyData[i];
              map.setPaintProperty('3d-buildings-' + i, 'fill-extrusion-color', getRandomColor(frequencyData[i]));
              map.setPaintProperty('3d-buildings-' + i, 'fill-extrusion-height',  frequencyData[i]);
              // map.setPaintProperty('3d-buildings-' + i, 'fill-extrusion-base', frequencyData[bins.length - i]);
          }
        
          requestAnimationFrame(funkyTown);
        }
        requestAnimationFrame(funkyTown);
    });

    function generateFrequencies(n) {
      var freq = [];
      var i = 0;
      for (i; i < n; i++) {
        freq.push(Math.floor((Math.random() * 100) + 1));
      }
      return freq;
    }
    function getRandomColor(freq) {
      var letters = '0123456789ABCDEF0123456789ABCDEF';
      var color = '#98F';
      for (var i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.floor(freq /8))];
      }
      return color;
    }
