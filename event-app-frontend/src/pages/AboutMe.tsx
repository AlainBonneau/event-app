import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl p-10 text-center w-full max-w-md flex flex-col items-center"
      >
        {/* Photo de profil */}
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-6">
          <img
            src="./images/photo-profil.png"
            alt="Photo de profil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texte de présentation */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Qui suis-je ?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Je suis un{" "}
          <span className="font-semibold text-primary">
            jeune développeur web
          </span>{" "}
          passionné, en pleine construction de mon portfolio que vous pouvez
          trouver{" "}
          <a
            href="https://www.alain-web.fr/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary"
          >
            Ici
          </a>
          . Mon objectif ? Créer des sites innovants et percutants afin de
          renforcer mes compétences et décrocher un emploi dans le domaine du
          développement.
        </p>
        <div className="logo-container flex justify-center gap-4 mt-4">
          <a
            href="https://github.com/AlainBonneau"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-8"
              src="./images/github-logo.png"
              alt="Logo de github"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/alain-bonneau/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-8"
              src="./images/linkedin-logo.png"
              alt="Logo de linkedin"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
