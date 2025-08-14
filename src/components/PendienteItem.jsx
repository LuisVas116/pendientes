import axios from 'axios';
import { useState } from 'react';

export default function PendienteItem({ pendiente, onUpdate }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(pendiente.titulo);
  const [observacion, setObservacion] = useState(pendiente.observacion);

  const handleDelete = async () => {
    await axios.delete(`http://192.168.1.25:3001/pendientes/${pendiente.id}`);
    onUpdate();
  };

  const handleEdit = async () => {
    await axios.put(`http://192.168.1.25:3001/pendientes/${pendiente.id}`, { titulo, observacion });
    setEditando(false);
    onUpdate();
  };

  return (
    <div className="card mb-2 p-2">
      {editando ? (
        <>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="form-control mb-1" />
          <input value={observacion} onChange={(e) => setObservacion(e.target.value)} className="form-control mb-1" />
          <button onClick={handleEdit} className="btn btn-success btn-sm me-2">Guardar</button>
        </>
      ) : (
        <>
          <h5>{pendiente.titulo}</h5>
          <p>{pendiente.observacion}</p>
          <button onClick={() => setEditando(true)} className="btn btn-warning btn-sm me-2">Editar</button>
        </>
      )}
      <button onClick={handleDelete} className="btn btn-danger btn-sm">Eliminar</button>
    </div>
  );
}
