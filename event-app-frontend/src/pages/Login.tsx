import React, { useState } from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Connexion réussie :", formData);
      // Ajouter la logique d'authentification ici (ex: API call)
    }
  };

  return (
    <section className="bg-gray-100 py-20 dark:bg-dark flex items-center justify-center min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-[525px] bg-white dark:bg-dark-2 rounded-lg shadow-lg p-10 sm:p-12 md:p-[60px] text-center transition-all duration-300">
            <h2 className="text-5xl font-bold text-dark dark:text-white mb-6">
              Connexion
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <InputBox
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputBox
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button
                type="submit"
                className="w-full rounded-md border border-primary bg-primary text-white px-5 py-3 text-base font-medium 
                transition-all duration-300 hover:bg-blue-600 active:scale-95 focus:ring-2 focus:ring-blue-300"
              >
                Connexion
              </button>
            </form>
            <div className="mt-6">
              <a
                href="/#"
                className="inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
              >
                Mot de passe oublié ?
              </a>
              <p className="text-base text-body-color dark:text-dark-6 mt-2">
                Pas encore inscrit ?{" "}
                <a href="/register" className="text-primary hover:underline">
                  S'inscrire
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

const InputBox: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-6 w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border px-5 py-3 text-base text-body-color outline-none transition-all duration-300 
          ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-300"
              : "border-stroke focus:border-primary focus:ring-2 focus:ring-blue-300 dark:border-dark-3 dark:text-white"
          }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
