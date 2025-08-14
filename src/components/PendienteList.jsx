import { useEffect, useState } from 'react';
import axios from 'axios';
import PendienteItem from './PendienteItem';

export default function PendienteList() {
  const [pendientes, setPendientes] = useState([]);

  const fetchPendientes = async () => {
    const res = await axios.get('http://192.168.1.25:3001/pendientes');
    setPendientes(res.data);
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  return (
    <div>
      {pendientes.map(p => (
        <PendienteItem key={p.id} pendiente={p} onUpdate={fetchPendientes} />
      ))}
    </div>
  );
}
