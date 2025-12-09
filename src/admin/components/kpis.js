import React, { useEffect, useState } from "react";
import Axios from "axios";

function KpisPrincipal() {
  const [totalServicios, setTotalServicios] = useState(0);
  const [totalPlanes, setTotalPlanes] = useState(0);
  const [totalPlanesResidenciales, setTotalPlanesResidenciales] = useState(0);
  const [totalServiciosIndustria, setTotalServiciosIndustria] = useState(0);

  useEffect(() => {
    // Servicios
    Axios.get("http://localhost:3001/api/servicios")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setTotalServicios(data.length);

        const industriaCount = data.filter((s) =>
          (s.segmento || "").toLowerCase().includes("industria")
        ).length;
        setTotalServiciosIndustria(industriaCount);
      })
      .catch((err) =>
        console.log("Error al cargar servicios para KPIs:", err)
      );

    // Planes
    Axios.get("http://localhost:3001/api/planes")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setTotalPlanes(data.length);

        const residCount = data.filter((p) =>
          (p.tipo || "").toLowerCase().includes("residencial")
        ).length;
        setTotalPlanesResidenciales(residCount);
      })
      .catch((err) => console.log("Error al cargar planes para KPIs:", err));
  }, []);

  return (
    <div className="row">
      {/* Servicios activos */}
      <div className="col-lg-3 col-6">
        <div className="small-box bg-teal">
          <div className="inner">
            <h3>{totalServicios}</h3>
            <p>Servicios activos</p>
          </div>
          <div className="icon">
            <i className="fas fa-tools" />
          </div>
          <a
            href="#tab-servicios"
            className="small-box-footer"
            data-section="servicios"
          >
            Ver servicios <i className="fas fa-arrow-circle-right" />
          </a>
        </div>
      </div>

      {/* Planes configurados */}
      <div className="col-lg-3 col-6">
        <div className="small-box bg-success">
          <div className="inner">
            <h3>{totalPlanes}</h3>
            <p>Planes configurados</p>
          </div>
          <div className="icon">
            <i className="fas fa-solar-panel" />
          </div>
          <a
            href="#tab-planes"
            className="small-box-footer"
            data-section="planes"
          >
            Ver planes <i className="fas fa-arrow-circle-right" />
          </a>
        </div>
      </div>

      {/* Planes residenciales */}
      <div className="col-lg-3 col-6">
        <div className="small-box bg-warning">
          <div className="inner">
            <h3>{totalPlanesResidenciales}</h3>
            <p>Planes residenciales</p>
          </div>
          <div className="icon">
            <i className="fas fa-home" />
          </div>
          <a
            href="#tab-planes"
            className="small-box-footer"
            data-section="planes"
          >
            Ir a planes <i className="fas fa-arrow-circle-right" />
          </a>
        </div>
      </div>

      {/* Servicios industria */}
      <div className="col-lg-3 col-6">
        <div className="small-box bg-danger">
          <div className="inner">
            <h3>{totalServiciosIndustria}</h3>
            <p>Servicios industria</p>
          </div>
          <div className="icon">
            <i className="fas fa-industry" />
          </div>
          <a
            href="#tab-servicios"
            className="small-box-footer"
            data-section="servicios"
          >
            Ir a servicios <i className="fas fa-arrow-circle-right" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default KpisPrincipal;
