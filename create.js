const API_BASE = "https://proyecto-1-full-stack-backend-production.up.railway.app";
let currentImageUrl = "";

const params = new URLSearchParams(window.location.search);
const seriesIdToEdit = params.get("id");

const el = {
  seriesForm: document.getElementById("seriesForm"),
  seriesId: document.getElementById("seriesId"),
  formTitle: document.getElementById("formTitle"),
  submitBtn: document.getElementById("submitBtn"),
  cancelEditBtn: document.getElementById("cancelEditBtn"),
  nameInput: document.getElementById("nameInput"),
  currentEpisodeInput: document.getElementById("currentEpisodeInput"),
  totalEpisodesInput: document.getElementById("totalEpisodesInput"),
  imageFileInput: document.getElementById("imageFileInput"),
};

init();

function init() {
  el.seriesForm.addEventListener("submit", onSubmitSeries);
  el.cancelEditBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  if (seriesIdToEdit) {
    loadSeriesForEdit(seriesIdToEdit);
  }
}

async function loadSeriesForEdit(id) {
  const response = await fetch(`${API_BASE}/series/${id}`);
  if (!response.ok) {
    const error = await safeJSON(response);
    alert(error.details || "No se pudo cargar la serie.");
    return;
  }

  const item = await response.json();
  el.seriesId.value = item.id;
  el.nameInput.value = item.name;
  el.currentEpisodeInput.value = item.current_episode;
  el.totalEpisodesInput.value = item.total_episodes;
  currentImageUrl = item.image_url || "";
  el.formTitle.textContent = `Editar Serie #${item.id}`;
  el.submitBtn.textContent = "Actualizar";
  el.cancelEditBtn.textContent = "Volver a la lista";
}

async function onSubmitSeries(event) {
  event.preventDefault();

  const selectedFile = el.imageFileInput.files[0];
  if (selectedFile) {
    currentImageUrl = await uploadSelectedImage(selectedFile);
    if (!currentImageUrl) {
      return;
    }
  }

  const payload = {
    name: el.nameInput.value.trim(),
    current_episode: Number(el.currentEpisodeInput.value),
    total_episodes: Number(el.totalEpisodesInput.value),
    image_url: currentImageUrl,
  };

  const editing = Boolean(el.seriesId.value);
  const response = await fetch(editing ? `${API_BASE}/series/${el.seriesId.value}` : `${API_BASE}/series`, {
    method: editing ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await safeJSON(response);
    alert(error.details || "No se pudo guardar la serie.");
    return;
  }

  window.location.href = "index.html";
}

async function uploadSelectedImage(file) {
  if (file.size > 1024 * 1024) {
    alert("La imagen debe pesar maximo 1MB.");
    return "";
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE}/upload-image`, {
    method: "POST",
    body: formData,
  });

  const data = await safeJSON(response);
  if (!response.ok) {
    alert(data.details || "No se pudo subir imagen.");
    return "";
  }

  return data.image_url || "";
}

function safeJSON(response) {
  return response.json().catch(() => ({}));
}