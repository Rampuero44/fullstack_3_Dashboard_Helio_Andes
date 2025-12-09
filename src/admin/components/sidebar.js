import React from "react";

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/dashboard" className="brand-link">
        {/* Si tienes un logo, úsalo aquí; si no, deja el ícono */}
        {/* <img
          src="/dist/img/AdminLTELogo.png"
          alt="HelioAndes Admin"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        /> */}
        <i
          className="fas fa-solar-panel brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">HelioAndes Admin</span>
      </a>

      {/* Sidebar */}
      <div className="sidebar">
        {/* User panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            {/* Puedes reemplazar por una imagen si quieres */}
            {/* <img
              src="/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User"
            /> */}
            <i
              className="fas fa-user-circle text-white"
              style={{ fontSize: 32 }}
            />
          </div>
          <div className="info">
            <span className="d-block text-white font-weight-semibold">
              Administrador
            </span>
            <span className="text-xs text-muted">Panel HelioAndes</span>
          </div>
        </div>

        {/* SidebarSearch Form (opcional, pero ayuda a que se vea igual a AdminLTE) */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-header">GESTIÓN</li>

            <li className="nav-item">
              <a
                href="#tab-servicios"
                className="nav-link active"
                data-section="servicios"
              >
                <i className="nav-icon fas fa-tools" />
                <p>Servicios</p>
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#tab-planes"
                className="nav-link"
                data-section="planes"
              >
                <i className="nav-icon fas fa-solar-panel" />
                <p>Planes</p>
              </a>
            </li>

            <li className="nav-header">INFORMACIÓN</li>
            <li className="nav-item">
              <span className="nav-link">
                <i className="nav-icon fas fa-info-circle" />
                <p className="text-sm mb-0">
                  Panel tipo AdminLTE
                  <br />
                  <span className="text-xs text-muted">(listar y ver detalle)</span>
                </p>
              </span>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Sidebar;
