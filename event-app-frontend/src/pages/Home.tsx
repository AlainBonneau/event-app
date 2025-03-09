import { motion } from "framer-motion";
import About from "../components/About";
import Presentation from "../components/Presentation";

const Home = () => {
  return (
    <main className="home-page max-w-[100vw] overflow-x-hidden">
      <section
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
        className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat"
      >
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
            Un site conçu pour vous aider à trouver ou organiser des événements.
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
      <section id="aboutSection" className="about-section">
        <About />
      </section>
      <section className="presentation-section">
        <Presentation />
      </section>
    </main>
  );
};

export default Home;
