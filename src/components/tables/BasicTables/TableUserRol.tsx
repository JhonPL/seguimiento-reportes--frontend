import { useState } from "react";

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
}

export default function TableUserRol() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: "USR-001",
      nombre: "Carlos Pérez",
      correo: "carlos.perez@correo.com",
      rol: "Administrador",
      estado: "Activo",
    },
    {
      id: "USR-002",
      nombre: "Laura Gómez",
      correo: "laura.gomez@correo.com",
      rol: "Docente",
      estado: "Inactivo",
    },
    {
      id: "USR-003",
      nombre: "Andrés Torres",
      correo: "andres.torres@correo.com",
      rol: "Estudiante",
      estado: "Activo",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUsuarios((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? selectedUser : u))
    );
    closeModal();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white pt-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* 🔍 Encabezado */}
      <div className="mb-4 flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestión de Usuarios y Roles
        </h3>

        <form>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="h-[42px] w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </form>
      </div>

      {/* 📋 Tabla */}
      <div className="custom-scrollbar max-w-full overflow-x-auto overflow-y-visible px-5 sm:px-6">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
          <thead className="border-y border-gray-100 text-left text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">ID</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Nombre</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Correo</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Rol</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Estado</th>
              <th className="px-4 py-3 text-center whitespace-nowrap font-semibold">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {usuarios.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">{u.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">{u.nombre}</td>
                <td className="px-4 py-3 whitespace-nowrap">{u.correo}</td>
                <td className="px-4 py-3 whitespace-nowrap">{u.rol}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      u.estado === "Activo"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {u.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(u)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-2 transition-colors"
                  >
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ⚙️ Footer de paginación */}
      <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <button className="text-sm flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
            ⬅ Anterior
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
            Página 1 de 5
          </span>
          <button className="text-sm flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
            Siguiente ➡
          </button>
        </div>
      </div>

      {/* 🧱 Modal */}
      {isOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Editar Usuario
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                value={selectedUser.nombre}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, nombre: e.target.value })
                }
                placeholder="Nombre completo"
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="email"
                value={selectedUser.correo}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, correo: e.target.value })
                }
                placeholder="Correo electrónico"
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <select
                value={selectedUser.rol}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, rol: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option>Administrador</option>
                <option>Docente</option>
                <option>Estudiante</option>
              </select>
              <select
                value={selectedUser.estado}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, estado: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
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