// URLs de la API falsa de Mockoon
const API_BASE = "http://localhost:3001";

// Estado en memoria
let servicios = [];
let planes = [];

// ----- FETCH A MOCKOON -----

async function cargarServicios() {
  try {
    const resp = await fetch(`${API_BASE}/servicios`);
    if (!resp.ok) throw new Error("Error HTTP servicios");
    servicios = await resp.json();
  } catch (e) {
    console.error("Error cargando servicios, usando datos de respaldo:", e);
    // respaldo por si Mockoon no está encendido
    servicios = [
      {
        id: 1,
        titulo: "Estudio energético",
        descripcion: "Análisis de consumo y dimensionamiento fotovoltaico."
      },
      {
        id: 2,
        titulo: "Instalación certificada SEC",
        descripcion: "Ejecución por instaladores certificados y normativa vigente."
      },
      {
        id: 3,
        titulo: "Monitoreo",
        descripcion: "Seguimiento del rendimiento del sistema en tiempo real."
      },
      {
        id: 4,
        titulo: "Mantención",
        descripcion: "Planes periódicos para extender la vida útil del sistema."
      }
    ];
  }
}

async function cargarPlanes() {
  try {
    const resp = await fetch(`${API_BASE}/planes`);
    if (!resp.ok) throw new Error("Error HTTP planes");
    planes = await resp.json();
  } catch (e) {
    console.error("Error cargando planes, usando datos de respaldo:", e);
    // respaldo por si Mockoon no está encendido
    planes = [
      {
        id: 1,
        titulo: "3–5 kW",
        rango: "Básico",
        bullets: ["Estudio energético", "Instalación estándar", "Monitoreo básico"]
      },
      {
        id: 2,
        titulo: "10–15 kW",
        rango: "Optimizado",
        bullets: ["Estudio avanzado", "Instalación optimizada", "Monitoreo avanzado"]
      },
      {
        id: 3,
        titulo: "Híbrido + baterías",
        rango: "Autónomo",
        bullets: ["Diseño off-grid", "Almacenamiento", "Soporte preferente"]
      }
    ];
  }
}

// ----- RENDER TABLAS -----

function renderServicios() {
  const tbody = document.querySelector("#tabla-servicios tbody");
  tbody.innerHTML = "";
  servicios.forEach((s, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${s.titulo}</td>
      <td>${s.descripcion}</td>
      <td>
        <button class="btn btn-xs btn-info btn-ver-serv" data-id="${s.id}">
          <i class="fas fa-eye"></i> Ver
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const total = servicios.length;
  const badge = document.getElementById("badge-servicios");
  const smallBox = document.getElementById("total-servicios");
  if (badge) badge.textContent = `${total} servicio${total !== 1 ? "s" : ""}`;
  if (smallBox) smallBox.textContent = total;
}

function renderPlanes() {
  const tbody = document.querySelector("#tabla-planes tbody");
  tbody.innerHTML = "";
  planes.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.titulo}</td>
      <td>
        <span class="badge badge-light border">${p.rango}</span>
      </td>
      <td>
        <button class="btn btn-xs btn-info btn-ver-plan" data-id="${p.id}">
          <i class="fas fa-eye"></i> Ver
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const total = planes.length;
  const badge = document.getElementById("badge-planes");
  const smallBox = document.getElementById("total-planes");
  if (badge) badge.textContent = `${total} plan${total !== 1 ? "es" : ""}`;
  if (smallBox) smallBox.textContent = total;
}

// ----- DETALLES -----

function mostrarDetalleServicio(id) {
  const cont = document.getElementById("serv-detalle");
  const serv = servicios.find(s => String(s.id) === String(id));
  if (!serv) {
    cont.innerHTML = "<p class='text-muted mb-0'>Servicio no encontrado.</p>";
    return;
  }
  cont.innerHTML = `
    <h5 class="mb-2">
      <i class="fas fa-wrench text-primary mr-2"></i>${serv.titulo}
    </h5>
    <p class="mb-1">${serv.descripcion}</p>
    <p class="text-xs text-muted mb-0">
      Información obtenida desde la API simulada (Mockoon).
    </p>
  `;
}

function mostrarDetallePlan(id) {
  const cont = document.getElementById("plan-detalle");
  const plan = planes.find(p => String(p.id) === String(id));
  if (!plan) {
    cont.innerHTML = "<p class='text-muted mb-0'>Plan no encontrado.</p>";
    return;
  }
  const bullets = Array.isArray(plan.bullets) ? plan.bullets : [];
  const bulletsHtml = bullets.map(b => `<li>${b}</li>`).join("");
  cont.innerHTML = `
    <h5 class="mb-2">
      <i class="fas fa-solar-panel text-success mr-2"></i>${plan.titulo}
      <small class="text-muted">(${plan.rango || ""})</small>
    </h5>
    <ul class="mb-2">${bulletsHtml}</ul>
    <p class="text-xs text-muted mb-0">
      Detalle de plan consumido desde Mockoon.
    </p>
  `;
}

// ----- CAMBIO DE PESTAÑAS -----

function activarSeccion(section) {
  document.querySelectorAll(".nav-link[data-section]").forEach(l => {
    if (l.dataset.section === section) l.classList.add("active");
    else l.classList.remove("active");
  });

  document.querySelectorAll(".section-tab").forEach(div => {
    div.style.display = div.id === "tab-" + section ? "block" : "none";
  });
}

// ----- INICIALIZACIÓN -----

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Cargar datos desde Mockoon
  await Promise.all([cargarServicios(), cargarPlanes()]);

  // 2) Renderizar tablas
  renderServicios();
  renderPlanes();

  // 3) Eventos tabla servicios
  document
    .querySelector("#tabla-servicios tbody")
    .addEventListener("click", e => {
      const btn = e.target.closest("button.btn-ver-serv");
      if (!btn) return;
      const id = btn.dataset.id;
      mostrarDetalleServicio(id);
    });

  // 4) Eventos tabla planes
  document
    .querySelector("#tabla-planes tbody")
    .addEventListener("click", e => {
      const btn = e.target.closest("button.btn-ver-plan");
      if (!btn) return;
      const id = btn.dataset.id;
      mostrarDetallePlan(id);
    });

  // 5) Sidebar
  document.querySelectorAll(".nav-link[data-section]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const section = link.dataset.section;
      activarSeccion(section);
    });
  });

  // 6) Small boxes
  document.querySelectorAll(".small-box-footer[data-section]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const section = link.dataset.section;
      activarSeccion(section);
      const tab = document.getElementById("tab-" + section);
      if (tab) tab.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // 7) Por defecto, mostrar Servicios
  activarSeccion("servicios");
});
