import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [pendientes, setPendientes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [observacion, setObservacion] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [ocultos, setOcultos] = useState({});
  const [finalizados, setFinalizados] = useState([]);
  const [mostrarFinalizados, setMostrarFinalizados] = useState(false);

  const fetchPendientes = async () => {
    const res = await fetch('http://192.168.1.25:3001/pendientes');
    const data = await res.json();
    setPendientes(data);
  };

  const fetchFinalizados = async () => {
    const res = await fetch('http://192.168.1.25:3001/pendientes/finalizados');
    const data = await res.json();
    setFinalizados(data);
  };

  useEffect(() => {
    fetchPendientes();
    fetchFinalizados();
  }, []);

  const agregarPendiente = async () => {
    if (titulo.trim() === '') return;

    if (editandoId) {
      await fetch(`http://192.168.1.25:3001/pendientes/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, observacion }),
      });
      setEditandoId(null);
    } else {
      await fetch('http://192.168.1.25:3001/pendientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, observacion }),
      });
    }

    setTitulo('');
    setObservacion('');
    fetchPendientes();
  };

  const eliminarPendiente = async (id) => {
    await fetch(`http://192.168.1.25:3001/pendientes/${id}`, { method: 'DELETE' });
    fetchPendientes();
    fetchFinalizados();
  };

  const exportarExcel = () => {
    const todos = [...pendientes, ...finalizados];
    if (todos.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(todos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
    XLSX.writeFile(workbook, "exportado.xlsx");
  };

  const pendientesAgrupados = pendientes.reduce((acc, p) => {
    if (!acc[p.titulo]) acc[p.titulo] = [];
    acc[p.titulo].push(p);
    return acc;
  }, {});

  const toggleGrupo = (titulo) => {
    setOcultos((prev) => ({
      ...prev,
      [titulo]: !prev[titulo],
    }));
  };

  return (

    
    <div className="d-flex flex-column min-vh-100 container">

      
      


      {/* Formulario */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                list="opciones-titulo"
                className="form-control"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <datalist id="opciones-titulo">
                <option value="PROYECTOS" />
                <option value="PRUEBAS" />
                <option value="PENDIENTE" />
              </datalist>
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Observación"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary w-100" onClick={agregarPendiente}>
                {editandoId ? '💾 Guardar Cambios' : '➕ Agregar Pendiente'}
              </button>
              <button className="btn btn-success" onClick={exportarExcel}>
                📥 Exportar a Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista agrupada */}
      {Object.entries(pendientesAgrupados).map(([grupo, items]) => (
        <div key={grupo} className="mb-4">
          <h4
            className="text-secondary border-bottom pb-1 mb-3"
            style={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => toggleGrupo(grupo)}
          >
            {ocultos[grupo] ? '▶️ ' : '🔽 '} {grupo}
          </h4>

          {!ocultos[grupo] && (
            <div className="row">
              {items.map((p) => (
                <div className="col-md-6 col-lg-4 mb-3" key={p.id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary fw-bold">{p.titulo}</h5>
                      <p className="card-text">{p.observacion}</p>
                    </div>
                    <div className="card-footer bg-light d-flex justify-content-between">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => {
                          setTitulo(p.titulo);
                          setObservacion(p.observacion);
                          setEditandoId(p.id);
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminarPendiente(p.id)}
                      >
                        🗑 Finalizar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="text-center my-4">
        <button className="btn btn-outline-dark fw-bold text-primary" onClick={() => setMostrarFinalizados(!mostrarFinalizados)}>
          {mostrarFinalizados ? '❎  Ocultar Finalizados' : '✅  Ver Finalizados'}
        </button>
      </div>

      {mostrarFinalizados && (
        <div className="mt-4">
          <h3 className="text-success mb-3">✅ Pendientes Finalizados</h3>
          <div className="row">
            {finalizados.map((f) => (
              <div className="col-md-6 col-lg-4 mb-3" key={f.id}>
                <div className="card h-100 shadow-sm border border-success">
                  <div className="card-body">
                    <h5 className="card-title text-success fw-bold">{f.titulo}</h5>
                    <p className="card-text">{f.observacion}</p>
                  </div>
                  <div className="card-footer bg-light d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={async () => {
                        await fetch(`http://192.168.1.25:3001/pendientes/reactivar/${f.id}`, {
                          method: 'PUT',
                        });
                        fetchPendientes();
                        fetchFinalizados();
                      }}
                    >
                      ♻️ Reactivar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer estilo claro */}
      

    </div>
  );
}

export default App;
