import React, { useState, useEffect } from "react";
import Axios from "axios";

function ListaServicios() {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/servicios")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setServicios(data);
      })
      .catch((error) => console.log("Error al cargar servicios:", error));
  }, []);

  const handleVerDetalle = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  return (
    <section className="content" id="tab-servicios">
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-tools mr-1" />
            Servicios registrados
          </h3>
          <div className="card-tools">
            <span className="badge badge-primary">
              {servicios.length} servicios
            </span>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            {/* Tabla */}
            <div className="col-md-8">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Título</th>
                      <th>Descripción corta</th>
                      <th style={{ width: 110 }}>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicios.map((servicio, index) => (
                      <tr key={servicio.id || index}>
                        <td>{index + 1}</td>
                        <td>{servicio.titulo}</td>
                        <td>{servicio.descripcion}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-info"
                            onClick={() => handleVerDetalle(servicio)}
                          >
                            <i className="fas fa-eye mr-1" />
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}

                    {servicios.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-muted">
                          No hay servicios registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detalle */}
            <div className="col-md-4">
              <div className="card card-outline card-info">
                <div className="card-header">
                  <h3 className="card-title">Detalle del servicio</h3>
                </div>
                <div className="card-body">
                  {servicioSeleccionado ? (
                    <>
                      <h5>{servicioSeleccionado.titulo}</h5>
                      <p className="text-muted mb-0">
                        {servicioSeleccionado.descripcion}
                      </p>
                    </>
                  ) : (
                    <p className="text-muted mb-0">
                      Selecciona un servicio en la tabla para ver el detalle.
                    </p>
                  )}
                </div>
                <div className="card-footer text-sm text-muted">
                  Requisito: listar servicios y ver detalle de un servicio
                  seleccionado.
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
      </div>
    </section>
  );
}

export default ListaServicios;
