import { useState } from 'react';
import axios from 'axios';

export default function PendienteForm({ onAdd }) {
  const [titulo, setTitulo] = useState('');
  const [observacion, setObservacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://192.168.1.25:3001/pendientes', { titulo, observacion });
    onAdd();
    setTitulo('');
    setObservacion('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título"
               className="form-control" required />
      </div>
      <div className="mb-2">
        <input value={observacion} onChange={(e) => setObservacion(e.target.value)} placeholder="Observación"
               className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
}
