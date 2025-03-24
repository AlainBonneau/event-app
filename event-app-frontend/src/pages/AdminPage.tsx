const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-dark px-4">
      <div className="bg-white dark:bg-dark-2 shadow-lg rounded-lg p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Espace Administrateur
        </h1>

        <div className="space-y-4">
          <a
            href="/admin/users"
            className="block w-full bg-primary text-white py-3 rounded-md text-lg font-semibold transition hover:bg-blue-600"
          >
            👤 Gestion des utilisateurs
          </a>

          <a
            href="/admin/events"
            className="block w-full bg-primary text-white py-3 rounded-md text-lg font-semibold transition hover:bg-blue-600"
          >
            📅 Gestion des événements
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
