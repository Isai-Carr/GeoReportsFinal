let currentLat = null;
let currentLng = null;

const coordsText = document.getElementById("coords");

navigator.geolocation.getCurrentPosition(
  (pos) => {
    currentLat = pos.coords.latitude;
    currentLng = pos.coords.longitude;
    coordsText.textContent = `${currentLat}, ${currentLng}`;
  },
  () => {
    coordsText.textContent = "No se pudo obtener la ubicación";
  }
);