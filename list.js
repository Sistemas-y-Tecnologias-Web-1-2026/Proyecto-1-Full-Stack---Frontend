const API_BASE = "https://proyecto-1-full-stack-backend-production.up.railway.app";
let currentPage = 1;
let totalPages = 1;

const el = {
  searchInput: document.getElementById("searchInput"),
  sortSelect: document.getElementById("sortSelect"),
  orderSelect: document.getElementById("orderSelect"),
  limitSelect: document.getElementById("limitSelect"),
  applyFiltersBtn: document.getElementById("applyFiltersBtn"),
  prevPageBtn: document.getElementById("prevPageBtn"),
  nextPageBtn: document.getElementById("nextPageBtn"),
  pageInfo: document.getElementById("pageInfo"),
  seriesTableBody: document.getElementById("seriesTableBody"),
  rowTemplate: document.getElementById("rowTemplate"),
};

init();

function init() {
  el.applyFiltersBtn.addEventListener("click", () => {
    currentPage = 1;
    loadSeries();
  });
  el.prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadSeries();
    }
  });
  el.nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadSeries();
    }
  });
  loadSeries();
}

async function loadSeries() {
  const params = new URLSearchParams({
    page: String(currentPage),
    limit: el.limitSelect.value,
    sort: el.sortSelect.value,
    order: el.orderSelect.value,
  });

  const query = el.searchInput.value.trim();
  if (query) {
    params.set("q", query);
  }

  const response = await fetch(`${API_BASE}/series?${params.toString()}`);
  if (!response.ok) {
    const error = await safeJSON(response);
    alert(error.details || "No se pudo cargar la lista.");
    return;
  }

  const result = await response.json();
  renderRows(result.data || []);
  renderPagination(result.meta || {});
}

function renderRows(items) {
  el.seriesTableBody.innerHTML = "";

  if (!items.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="5">No hay series para mostrar.</td>';
    el.seriesTableBody.appendChild(tr);
    return;
  }

  items.forEach((item) => {
    const row = el.rowTemplate.content.firstElementChild.cloneNode(true);
    row.querySelector(".name").textContent = item.name;
    row.querySelector(".episodes").textContent = `${item.current_episode}/${item.total_episodes}`;
    row.querySelector(".rating").textContent = renderRating(item.average_rating);

    const coverCell = row.querySelector(".cover");
    coverCell.innerHTML = item.image_url
      ? `<img src="${item.image_url}" alt="${escapeHTML(item.name)}"/>`
      : "Sin imagen";

    const actionsCell = row.querySelector(".actions");
    actionsCell.append(buildActions(item));

    el.seriesTableBody.appendChild(row);
  });
}

function renderRating(value) {
  return value === null || value === undefined ? "Sin rating" : `${Number(value).toFixed(1)} / 10`;
}

function buildActions(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "cell-actions";

  const editLink = document.createElement("a");
  editLink.className = "button-link";
  editLink.href = `create.html?id=${item.id}`;
  editLink.textContent = "Editar";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "danger";
  deleteBtn.textContent = "Eliminar";
  deleteBtn.addEventListener("click", () => deleteSeries(item.id));

  const rateBtn = document.createElement("button");
  rateBtn.type = "button";
  rateBtn.className = "secondary";
  rateBtn.textContent = "Rate";
  rateBtn.addEventListener("click", () => createRating(item.id));

  wrapper.append(editLink, deleteBtn, rateBtn);
  return wrapper;
}

async function deleteSeries(id) {
  if (!confirm("Deseas eliminar esta serie?")) {
    return;
  }

  const response = await fetch(`${API_BASE}/series/${id}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    const error = await safeJSON(response);
    alert(error.details || "No se pudo eliminar.");
    return;
  }

  loadSeries();
}

async function createRating(id) {
  const raw = prompt("Rating 0-10:");
  if (raw === null) {
    return;
  }

  const score = Number(raw);
  if (Number.isNaN(score)) {
    alert("Rating invalido.");
    return;
  }

  const response = await fetch(`${API_BASE}/series/${id}/rating`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score }),
  });

  if (!response.ok) {
    const error = await safeJSON(response);
    alert(error.details || "No se pudo guardar rating.");
    return;
  }

  loadSeries();
}

function renderPagination(meta) {
  totalPages = meta.total_pages || 1;
  const total = meta.total || 0;
  el.pageInfo.textContent = `Pagina ${currentPage} de ${totalPages} (${total})`;
  el.prevPageBtn.disabled = currentPage <= 1;
  el.nextPageBtn.disabled = currentPage >= totalPages;
}

function safeJSON(response) {
  return response.json().catch(() => ({}));
}

function escapeHTML(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}