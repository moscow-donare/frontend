import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { X, MapPin, Slash, Clock, Check, FileText, ArrowRightLeft, Zap } from "lucide-react";

const ComparativeSection = () => (
  <div className="mb-16">
    <h3 className="text-2xl font-bold text-center mb-8 text-primary-dark">
      El Antes y el Después de Tu Generosidad
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Tarjeta roja para Método Tradicional */}
      <Card className="bg-red-50 border border-red-200 p-6 md:p-8 h-full shadow-lg hover:shadow-2xl hover:-rotate-1 hover:scale-105 transition-all duration-300 ease-in-out">
        <h4 className="text-xl font-semibold mb-4 text-red-700 flex items-center">
          <X className="w-6 h-6 text-red-500 mr-2" /> Método Tradicional
        </h4>
        <motion.ul 
          className="space-y-6 text-red-900"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.li className="flex items-start" variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <div>
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-red-400 mr-2" />
                <span className="font-medium text-red-700">Un Viaje a Ciegas</span>
              </div>
              <p>Donas y tu dinero desaparece en un sistema complejo. Recibes un "gracias", pero dudas: ¿llegó?, ¿en qué se usó?</p>
            </div>
          </motion.li>
          <motion.li className="flex items-start" variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <div>
              <div className="flex items-center mb-2">
                <Slash className="w-5 h-5 text-red-400 mr-2" />
                <span className="font-medium text-red-700">Impacto Reducido</span>
              </div>
              <p>Tu aporte se reduce por comisiones bancarias, gastos administrativos y conversiones de moneda.</p>
            </div>
          </motion.li>
          <motion.li className="flex items-start" variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <div>
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-red-400 mr-2" />
                <span className="font-medium text-red-700">Ayuda que Tarda</span>
              </div>
              <p>Transferencias, sobre todo internacionales, pueden demorar días, un tiempo valioso en emergencias.</p>
            </div>
          </motion.li>
        </motion.ul>
      </Card>
      {/* Tarjeta verde con colores del sistema para Donaré */}
      <Card className="bg-primary/10 border border-primary/20 p-6 md:p-8 h-full shadow-lg hover:shadow-2xl hover:rotate-1 hover:scale-105 transition-all duration-300 ease-in-out">
        <h4 className="text-xl font-semibold mb-4 text-primary flex items-center">
          <Check className="w-6 h-6 text-primary mr-2" /> Donaré con Blockchain
        </h4>
        <motion.ul 
          className="space-y-6 text-primary-dark"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.li className="flex items-start" variants={{ hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <div>
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium text-primary">Un Camino de Cristal</span>
              </div>
              <p>Pruebas en lugar de fe ciega. Cada movimiento de tu donación deja una huella digital que puedes seguir, en tiempo real.</p>
            </div>
          </motion.li>
          <motion.li className="flex items-start" variants={{ hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <div>
              <div className="flex items-center mb-2">
                <ArrowRightLeft className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium text-primary">Conexión Directa, Impacto Completo</span>
              </div>
              <p>Sin intermediarios. Tu aporte viaja directamente a la causa, asegurando que el valor que envías es el valor que se recibe.</p>
            </div>
          </motion.li>
          <motion.li className="flex items-start" variants={{ hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <div>
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium text-primary">Impacto en Minutos, No en Días</span>
              </div>
              <p>Tu generosidad se moviliza a la velocidad de la tecnología, llegando de forma casi instantánea y sin fronteras.</p>
            </div>
          </motion.li>
        </motion.ul>
      </Card>
    </div>
    <motion.p 
      className="mt-8 text-center text-lg text-gray-800 font-medium max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.8 } },
      }}
    >
      En Donaré, no solo modernizamos el proceso; le devolvemos al donante el poder de la certeza. 
      Tu generosidad merece ser tan eficiente y transparente como la tecnología de hoy.
    </motion.p>
  </div>
);

export default ComparativeSection;