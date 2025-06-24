import { Card } from "@heroui/react";
import { Lock, Eye, BarChart } from "lucide-react";

const features = [
  {
    icon: <Lock className="h-6 w-6 text-teal-600" />,
    title: "Seguridad Garantizada",
    desc: "Cada transacción es inmutable y criptográficamente segura, lo que significa que no puede ser alterada ni falsificada.",
    bg: "bg-teal-100"
  },
  {
    icon: <Eye className="h-6 w-6 text-purple-600" />,
    title: "Transparencia Total",
    desc: "Todos los movimientos de fondos son públicos y verificables en tiempo real, sin posibilidad de manipulación.",
    bg: "bg-purple-100"
  },
  {
    icon: <BarChart className="h-6 w-6 text-orange-600" />,
    title: "Eficiencia Máxima",
    desc: "Reducimos drásticamente los costos operativos para que más de tu donación llegue a quien realmente lo necesita.",
    bg: "bg-orange-100"
  }
];

const FeatureCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {features.map((f, i) => (
      <Card key={i} className="bg-gray-50 p-6 md:p-8 text-center shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out h-full">
        <div className="flex flex-col items-center h-full">
          <div className={`${f.bg} rounded-full p-3 inline-block mb-4`}>
            {f.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      </Card>
    ))}
  </div>
);

export default FeatureCards;