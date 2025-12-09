import React, { useState, useEffect } from "react";
import Axios from "axios";

function ListaPlanes() {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/planes")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setPlanes(data);
      })
      .catch((error) => console.log("Error al cargar planes:", error));
  }, []);

  return (
    <section className="content" id="tab-planes">
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-solar-panel mr-1" />
            Planes registrados
          </h3>
          <div className="card-tools">
            <span className="badge badge-success">
              {planes.length} planes
            </span>
          </div>
        </div>

        <div className="card-body pb-0">
          <div className="row">
            {planes.map((plan) => {
              const bullets = Array.isArray(plan.bullets)
                ? plan.bullets
                : [];

              return (
                <div
                  key={plan.id}
                  className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                >
                  <div className="card bg-light d-flex flex-fill">
                    <div className="card-header text-muted border-bottom-0">
                      Plan {plan.rango}
                    </div>
                    <div className="card-body pt-0">
                      <div className="row">
                        <div className="col-12">
                          <h2 className="lead">
                            <b>{plan.titulo}</b>
                          </h2>
                          <p className="text-muted text-sm">
                            <b>Incluye:</b>
                          </p>
                          <ul className="fa-ul text-muted ml-3">
                            {bullets.map((b, idx) => (
                              <li key={idx}>
                                <span className="fa-li">
                                  <i className="fas fa-check-circle" />
                                </span>
                                {b}
                              </li>
                            ))}

                            {bullets.length === 0 && (
                              <li className="text-muted">
                                Sin detalles registrados.
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="text-right">
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                        >
                          <i className="fas fa-solar-panel mr-1" />
                          Ver plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {planes.length === 0 && (
              <div className="col-12 text-center text-muted mb-3">
                No hay planes disponibles.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListaPlanes;
