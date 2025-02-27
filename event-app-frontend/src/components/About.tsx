import { motion } from "framer-motion";

interface ServiceProps {
  title: string;
  details: string;
  icon: React.ReactNode;
}

const About = () => {
  return (
    <div className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Notre service
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Ce que nous offrons
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Nous vous aidons à trouver ou organiser des événements en vous
                proposant une liste d'événements à venir.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Responsive Design"
            details="Que vous soyez sur un téléphone, une tablette ou un ordinateur, notre site s'adapte à votre écran."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="currentColor" // Ajout de "currentColor" pour s'adapter au mode clair/sombre
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.0375 1.2374C11.8125 -0.393851 2.92503 5.7374 1.29378 14.9624C0.450029 19.4061 1.46253 23.9624 4.05003 27.6749C6.63753 31.4436 10.5188 33.9186 14.9625 34.7624C15.975 34.9311 16.9875 35.0436 18 35.0436C26.0438 35.0436 33.2438 29.2499 34.7625 21.0374C36.3938 11.8124 30.2625 2.9249 21.0375 1.2374ZM32.2313 20.5874C32.175 21.0374 32.0625 21.4874 31.95 21.8811L19.2375 17.0999V3.5999C19.6875 3.65615 20.1375 3.7124 20.5313 3.76865C28.4063 5.1749 33.6375 12.7124 32.2313 20.5874ZM16.7063 3.5999V16.7624H3.60003C3.65628 16.3124 3.71253 15.8624 3.76878 15.4124C4.95003 8.83115 10.4063 4.10615 16.7063 3.5999ZM15.4125 32.2311C11.5875 31.5561 8.32503 29.4186 6.13128 26.2124C4.66878 24.1311 3.82503 21.7124 3.60003 19.2374H17.775L31.05 24.2436C28.2938 29.9811 21.9375 33.4686 15.4125 32.2311Z" />
              </svg>
            }
          />
          <ServiceCard
            title="Créer ou rejoindre des événements"
            details="Créez des événements et partagez-les avec d'autres personnes ou rejoignez des événements organisés par d'autres."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.89195 14.625C10.9995 10.1252 13.769 7.875 18.1996 7.875C24.8458 7.875 25.6765 12.9375 28.9996 13.7812C31.2151 14.3439 33.1535 13.5002 34.815 11.25C33.7075 15.7498 30.9379 18 26.5073 18C19.8611 18 19.0304 12.9375 15.7073 12.0938C13.4918 11.5311 11.5535 12.3748 9.89195 14.625ZM1.58423 24.75C2.69174 20.2502 5.46132 18 9.89195 18C16.5381 18 17.3689 23.0625 20.692 23.9062C22.9075 24.4689 24.8458 23.6252 26.5073 21.375C25.3998 25.8748 22.6302 28.125 18.1996 28.125C11.5535 28.125 10.7227 23.0625 7.39963 22.2188C5.18405 21.6561 3.24576 22.4998 1.58423 24.75Z" />
              </svg>
            }
          />
          <ServiceCard
            title="Panel d'administration"
            details="Notre site dispose d'un panneau d'administration pour gérer les événements, ainsi que les utilisateurs."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.2063 1.9126H5.0625C3.15 1.9126 1.575 3.4876 1.575 5.4001V12.5438C1.575 14.4563 3.15 16.0313 5.0625 16.0313H12.2063C14.1188 16.0313 15.6938 14.4563 15.6938 12.5438V5.45635C15.75 3.4876 14.175 1.9126 12.2063 1.9126ZM13.2188 12.6001C13.2188 13.1626 12.7688 13.6126 12.2063 13.6126H5.0625C4.5 13.6126 4.05 13.1626 4.05 12.6001V5.45635C4.05 4.89385 4.5 4.44385 5.0625 4.44385H12.2063C12.7688 4.44385 13.2188 4.89385 13.2188 5.45635V12.6001Z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default About;

const ServiceCard = ({ icon, title, details }: ServiceProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Effet de zoom au survol
      whileTap={{ scale: 0.95 }} // Réduction à l'appui
      transition={{ duration: 0.3 }} // Transition fluide
      className="w-full px-4 md:w-1/2 lg:w-1/3"
    >
      <div className="mb-9 rounded-[20px] bg-white p-10 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-dark-2 md:px-7 xl:px-10">
        <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary text-white">
          {icon}
        </div>
        <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
          {title}
        </h4>
        <p className="text-body-color dark:text-dark-6">{details}</p>
      </div>
    </motion.div>
  );
};
