import { useEffect, useState } from "react";
import { X } from "lucide-react";

const getPedidos = async () => {
  return [
    {
      celular: "664-123-4567",
      email: "A@usuario.123",
      nombre: "Juan Gonzales",
      fechaRecoleccion: "12 - 03 - 2025",
    },
    {
      celular: "664-555-1234",
      email: "A@usuario.123",
      nombre: "Ernesto Peña",
      fechaRecoleccion: "12 - 03 - 2025",
    },
    {
      celular: "664-987-6543",
      email: "A@usuario.123",
      nombre: "Juan Aguirre",
      fechaRecoleccion: "12 - 03 - 2025",
    },
    {
      celular: "664-789-0123",
      email: "A@usuario.123",
      nombre: "Matilda Lopez",
      fechaRecoleccion: "12 - 03 - 2025",
    },
    {
      celular: "664-234-5678",
      email: "A@usuario.123",
      nombre: "David Benavides",
      fechaRecoleccion: "12 - 03 - 2025",
    },
    {
      celular: "664-876-5432",
      email: "A@usuario.123",
      nombre: "Omar Salcedo",
      fechaRecoleccion: "12 - 03 - 2025",
    },
    {
      celular: "664-345-6789",
      email: "A@usuario.123",
      nombre: "Santiago Lugo",
      fechaRecoleccion: "12 - 03 - 2025",
    },
  ];
};

export default function PedidosTable({ onClose }) {
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const datos = await getPedidos();
      setPedidos(datos);
    };
    fetchData();
  }, []);

  const pedidosFiltrados = pedidos.filter(
    (p) =>
      p.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.celular.includes(busqueda)
  );

  return (
    <div className="p-4 w-full bg-yellow-100 rounded-lg shadow-md">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar por correo o celular..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="px-4 py-2 border rounded-md w-1/3"
        />
        <button className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">
          Buscar
        </button>
        <div className="relative">
          <select className="px-4 py-2 border rounded-md bg-white">
            <option>Buscar en ...</option>
            <option>Correo</option>
            <option>Celular</option>
          </select>
        </div>
        <button
          onClick={onClose} // Llama a la función para cerrar el componente
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full table-auto text-sm bg-yellow-50 rounded-lg">
          <thead className="bg-yellow-200">
            <tr>
              <th className="p-2 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Correo</th>
              <th className="p-2 text-left">Celular</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.length ? (
              pedidosFiltrados.map((pedido, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-yellow-100" : "bg-yellow-50"
                  }`}
                >
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2">{pedido.nombre}</td>
                  <td className="p-2 lowercase">{pedido.email}</td>
                  <td className="p-2">{pedido.celular}</td>
                  <td className="p-2">{pedido.fechaRecoleccion}</td>
                  <td className="p-2 flex space-x-2">
                    <button className="text-red-500 hover:underline">🗑</button>
                    <button className="text-blue-500 hover:underline">
                      ✏️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
