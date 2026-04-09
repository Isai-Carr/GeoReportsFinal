const video = document.getElementById("camera");
const canvas = document.getElementById("snapshot");
const preview = document.getElementById("photo-preview");

// Activar cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error("Error cámara:", err));

// Tomar foto
document.getElementById("btn-take-photo")?.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) {
      alert("Error al capturar imagen");
      return;
    }

    window.currentPhotoBlob = blob; // ✅ guardar blob real
    preview.src = URL.createObjectURL(blob);

  }, "image/jpeg", 0.9);
});