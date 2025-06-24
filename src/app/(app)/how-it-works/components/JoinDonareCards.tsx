import { motion } from "framer-motion";
import { Heart, Zap, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

const sectionJoinCardsContainerMotion = {
  initial: "hidden",
  whileInView: "visible",
  exit: "hidden",
  viewport: { once: false },
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  }
};

const sectionJoinCardItemMotion = {
  variants: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
};

const cards = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Haz una Donación",
    desc: "Apoya causas importantes con la seguridad de que tu dinero llegará a quien lo necesita.",
    href: "/",
    link: "Ver campañas"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Crea una Campaña",
    desc: "Inicia tu propia campaña para financiar un proyecto o ayudar a quien lo necesite.",
    href: "/campaigns/create",
    link: "Crear campaña"
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Verifica Transparencia",
    desc: "Consulta el registro blockchain para verificar cada transacción realizada en la plataforma.",
    href: "/",
    link: "Explorar blockchain"
  }
];

const JoinDonareCards = () => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-3 gap-8"
    {...sectionJoinCardsContainerMotion}
  >
    {cards.map((c, i) => (
      <motion.div key={i} {...sectionJoinCardItemMotion} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-white/20 rounded-full p-3 inline-block mb-4">
            {c.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
          <p className="text-teal-100 mb-4">{c.desc}</p>
          <Link 
            href={c.href}
            className="inline-flex items-center text-white font-medium hover:text-teal-100 mt-auto"
          >
            {c.link} <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default JoinDonareCards;