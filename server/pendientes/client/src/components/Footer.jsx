import React from 'react'

export default function Footer() {
  return (
    <>
    <footer className="bg-light text-dark py-4 mt-auto border-top">
        <div className="container">
          <div className="row">
            {/* Columna 1 */}
            <div className="col-md-4 mb-3">
              <h4 className="fw-bold text-primary">Pendientes</h4>
              <p className="mb-0">
                Aplicación para organizar y dar seguimiento a tus tareas pendientes.
              </p>
            </div>
            {/* Columna 2 */}
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold text-primary">Enlaces rápidos</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark text-decoration-none">Inicio</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Acerca</a></li>
                <li><a href="https://wa.me/573017478865" className="text-dark text-decoration-none">Contacto</a></li>
              </ul>
            </div>
            {/* Columna 3 */}
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold text-primary">Contáctanos</h5>
              <p className="mb-1">Email: luis116195@hotmail.com</p>
              <div className="d-flex gap-3">
                <i className="bi bi-facebook text-primary"></i>
                <i className="bi bi-instagram text-danger"></i>
                <i className="bi bi-twitter text-info"></i>
              </div>
            </div>
          </div>
          <hr />
          <p className="text-center text-muted small mb-0">
            © {new Date().getFullYear()} Pendientes — Todos los derechos reservados
          </p>
        </div>
      </footer>
    
    </>
  )
}
