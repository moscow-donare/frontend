import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { Database, Shield } from "lucide-react";

const imageCardMotionProps = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeInOut" as const, delay: 0.2 }
};

const BlockchainImageCard = () => (
  <motion.div {...imageCardMotionProps}>
    <Card className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="relative">
        <img 
          src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Blockchain Technology"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-2">Tecnología Blockchain</h3>
          <p className="text-white text-sm">
            Nuestra plataforma utiliza contratos inteligentes para garantizar que cada transacción
            sea segura, transparente y verificable.
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-gray-50 p-4">
            <div className="flex items-center mb-2">
              <Database className="h-5 w-5 text-teal-600 mr-2" />
              <h4 className="font-medium text-gray-900">Registro Descentralizado</h4>
            </div>
            <p className="text-sm text-gray-600">
              Todas las transacciones son almacenadas en múltiples nodos para garantizar su integridad.
            </p>
          </Card>
          <Card className="bg-gray-50 p-4">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-teal-600 mr-2" />
              <h4 className="font-medium text-gray-900">Seguridad Criptográfica</h4>
            </div>
            <p className="text-sm text-gray-600">
              Utilizamos encriptación avanzada para proteger todas las transacciones.
            </p>
          </Card>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default BlockchainImageCard;