function irAReporte() {
  window.location = "report.html";
}

// Splash
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
  }, 1000);
});

// UI
window.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome-screen");
  const reports = document.getElementById("report-section");

  if (localStorage.getItem("verReportes")) {
    welcome.style.display = "none";
    reports.style.display = "block";
    localStorage.removeItem("verReportes");
  }
});

// Guardar
document.getElementById("btn-save-report")?.addEventListener("click", () => {
  const data = {
    titulo: title.value,
    descripcion: description.value,
    foto: window.currentPhotoBlob,
    lat: currentLat,
    lng: currentLng,
    fecha: new Date().toLocaleString()
  };

  guardarReporte(data);

  if (navigator.onLine) {
    notify("Reporte enviado con éxito");
  } else {
    notify("Reporte guardado offline");
  }

  localStorage.setItem("verReportes", "true");
  window.location = "index.html";
});

// SW
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

// Offline visual
window.addEventListener("offline", () => {
  document.querySelectorAll("button").forEach(b =>
    b.classList.add("offline-mode")
  );
});