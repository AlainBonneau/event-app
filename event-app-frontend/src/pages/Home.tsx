import { motion } from "framer-motion";
import About from "../components/About";
import Presentation from "../components/Presentation";

const Home = () => {
  return (
    <div className="home-page max-w-[100vw] overflow-x-hidden">
      <div className="relative w-full h-screen bg-gradient-to-br from-[#007bff] to-[#0056b3] overflow-hidden">
        {/* Cercles */}
        <div className="absolute top-10 left-20 w-40 h-40 bg-[#ff7f50] opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-16 w-32 h-32 bg-[#ff7f50] opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-52 h-52 bg-[#ff7f50] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-40 w-28 h-28 bg-[#ff7f50] opacity-50 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#ff7f50] opacity-25 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Contenu de la page */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <section className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat">
            <div className="bg-black/40 p-6 rounded-lg">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl font-bold text-primary"
              >
                Event'<span className="text-secondary">Go</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-lg text-white p-4 max-w-lg"
              >
                Un site conçu pour vous aider à trouver ou organiser des
                événements.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex gap-4 mt-6 items-center justify-center"
              >
                <a
                  className="px-6 py-3 text-lg font-semibold text-white bg-primary border border-primary rounded-lg shadow-md 
               transition-all duration-200 ease-in-out 
               hover:bg-blue-600 hover:border-blue-600 
               active:scale-95 active:bg-blue-700 
               focus:outline-none focus:ring-2 focus:ring-blue-300"
                  href="/events"
                >
                  Événements
                </a>
                <a
                  className="px-6 py-3 text-lg font-semibold text-white bg-secondary border border-secondary rounded-lg shadow-md 
               transition-all duration-200 ease-in-out 
               hover:bg-orange-500 hover:border-orange-500 
               active:scale-95 active:bg-orange-600 
               focus:outline-none focus:ring-2 focus:ring-orange-300"
                  href="#aboutSection"
                >
                  Voir plus
                </a>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      <section id="aboutSection" className="about-section">
        <About />
      </section>
      <section className="presentation-section">
        <Presentation />
      </section>
    </div>
  );
};

export default Home;
