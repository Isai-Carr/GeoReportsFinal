let db;

const request = indexedDB.open("GeoReportDB", 1);

request.onupgradeneeded = (e) => {
  db = e.target.result;

  if (!db.objectStoreNames.contains("reportes")) {
    db.createObjectStore("reportes", {
      keyPath: "id",
      autoIncrement: true
    });
  }
};

request.onsuccess = (e) => {
  db = e.target.result;
  mostrarReportes();
};

// GUARDAR
function guardarReporte(data) {
  const tx = db.transaction("reportes", "readwrite");
  tx.objectStore("reportes").add(data);
  tx.oncomplete = () => mostrarReportes();
}

// MOSTRAR
function mostrarReportes() {
  const ul = document.getElementById("report-list");
  if (!ul) return;

  ul.innerHTML = "";

  const tx = db.transaction("reportes", "readonly");
  const store = tx.objectStore("reportes");

  store.openCursor().onsuccess = (e) => {
    const cursor = e.target.result;

    if (cursor) {
      const data = cursor.value;

      let imgURL = "";
      if (data.foto instanceof Blob) {
        imgURL = URL.createObjectURL(data.foto);
      }

      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${data.titulo}</strong><br>
        <span>${data.descripcion}</span><br>
        ${imgURL ? `<img src="${imgURL}" width="100%">` : ""}
        <br>
        <small>${data.lat}, ${data.lng}</small><br>

        <button onclick="editarReporte(${data.id})">Editar</button>
        <button onclick="eliminarReporte(${data.id})">Eliminar</button>
      `;

      ul.appendChild(li);
      cursor.continue();
    }
  };
}

// ELIMINAR
function eliminarReporte(id) {
  const tx = db.transaction("reportes", "readwrite");
  tx.objectStore("reportes").delete(id);
  tx.oncomplete = () => mostrarReportes();
}

// EDITAR
function editarReporte(id) {
  const tx = db.transaction("reportes", "readonly");
  const store = tx.objectStore("reportes");

  const req = store.get(id);

  req.onsuccess = () => {
    const data = req.result;

    localStorage.setItem("editReporte", JSON.stringify(data));
    localStorage.setItem("verReportes", "true");

    window.location = "report.html";
  };
}