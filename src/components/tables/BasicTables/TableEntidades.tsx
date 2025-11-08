import { useState } from "react";

export default function TableEntidades() {
    const [entidades, setEntidades] = useState([
    {
      id: "ENT-001",
      nit: "900123456-7",
      nombre: "Ministerio de Educación Nacional",
      web: "https://www.mineducacion.gov.co",
      baseLegal: "Ley 30 de 1992, Decreto 1075 de 2015",
      estado: "Activo",
      fecha: "2024-09-12 10:32",
    },
    {
      id: "ENT-002",
      nit: "901456789-1",
      nombre: "ICETEX",
      web: "https://www.icetex.gov.co",
      baseLegal: "Ley 1002 de 2005",
      estado: "Inactivo",
      fecha: "2024-07-01 15:10",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntidad, setSelectedEntidad] = useState(null);

  const handleEdit = (entidad) => {
    setSelectedEntidad(entidad);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEntidad(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEntidades((prev) =>
      prev.map((en) => (en.id === selectedEntidad.id ? selectedEntidad : en))
    );
    closeModal();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* 🔍 Encabezado */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Gestión de Entidades
        </h3>

        <form>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar entidad..."
              className="h-[38px] w-full rounded-md border border-gray-300 bg-transparent py-2 pr-3 pl-[32px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden sm:w-[250px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </form>
      </div>

      {/* 📋 Tabla compacta */}
      <table className="w-full text-sm text-gray-700 dark:text-gray-300">
        <thead className="border-y border-gray-100 text-left text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <tr>
            <th className="px-3 py-2 font-semibold">Entidad</th>
            <th className="px-3 py-2 font-semibold">NIT</th>
            <th className="px-3 py-2 font-semibold hidden md:table-cell">Base Legal</th>
            <th className="px-3 py-2 font-semibold text-center">Estado</th>
            <th className="px-3 py-2 font-semibold text-center">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {entidades.map((e) => (
            <tr
              key={e.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td className="px-3 py-2">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{e.nombre}</p>
                  <a
                    href={e.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs hover:underline dark:text-blue-400"
                  >
                    {e.web.replace("https://", "").split("/")[0]}
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span className="hidden sm:inline">Creado: </span>
                    {e.fecha}
                  </p>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{e.nit}</td>
              <td className="px-3 py-2 hidden md:table-cell">{e.baseLegal}</td>
              <td className="px-3 py-2 text-center">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    e.estado === "Activo"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {e.estado}
                </span>
              </td>
              <td className="px-3 py-2 text-center">
                <button
                  onClick={() => handleEdit(e)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-1"
                >
                  ✏️
                </button>
                <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🧱 Modal */}
      {isOpen && selectedEntidad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg dark:bg-gray-900">
            <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">
              Editar Entidad
            </h2>
            <form onSubmit={handleSave} className="space-y-2">
              <input
                type="text"
                value={selectedEntidad.nit}
                onChange={(e) =>
                  setSelectedEntidad({ ...selectedEntidad, nit: e.target.value })
                }
                placeholder="NIT"
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                value={selectedEntidad.nombre}
                onChange={(e) =>
                  setSelectedEntidad({ ...selectedEntidad, nombre: e.target.value })
                }
                placeholder="Nombre de la Entidad"
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                value={selectedEntidad.web}
                onChange={(e) =>
                  setSelectedEntidad({ ...selectedEntidad, web: e.target.value })
                }
                placeholder="Página Web"
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <textarea
                value={selectedEntidad.baseLegal}
                onChange={(e) =>
                  setSelectedEntidad({ ...selectedEntidad, baseLegal: e.target.value })
                }
                placeholder="Base Legal"
                rows={2}
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              ></textarea>
              <select
                value={selectedEntidad.estado}
                onChange={(e) =>
                  setSelectedEntidad({ ...selectedEntidad, estado: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </select>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}