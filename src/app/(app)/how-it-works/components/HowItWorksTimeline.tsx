import { motion } from "framer-motion";

const steps = [
	{
		title: "Creación de Campaña",
		desc: "El beneficiario crea una campaña detallando el objetivo, el monto necesario y la fecha límite. Se genera automáticamente un contrato inteligente en la blockchain.",
	},
	{
		title: "Proceso de Verificación",
		desc: "Nuestro equipo verifica la identidad del beneficiario y la validez de la campaña para garantizar la legitimidad de la causa.",
	},
	{
		title: "Donaciones Transparentes",
		desc: "Los donantes realizan sus aportes que son registrados en la blockchain, creando un registro público e inmutable de cada transacción.",
	},
	{
		title: "Transferencia de Fondos",
		desc: "Los fondos son transferidos directamente al beneficiario con un registro detallado de cada movimiento, asegurando que lleguen a su destino.",
	},
];

const listMotionProps = {
	initial: "hidden",
	whileInView: "visible",
	viewport: { once: true },
	variants: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.7,
				staggerChildren: 0.4,
			},
		},
	},
};
const listItemMotionVariants = {
	hidden: { opacity: 0, x: -40 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const HowItWorksTimeline = () => (
	<motion.ol className="relative border-l border-gray-300" {...listMotionProps}>
		{steps.map((step, i) => (
			<motion.li key={i} className={`mb-10 ml-6`} variants={listItemMotionVariants}>
				<span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-primary-600 rounded-full">
					<span className="text-white text-sm font-bold">{i + 1}</span>
				</span>
				<h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{step.title}</h3>
				<p className="mb-4 text-gray-600">{step.desc}</p>
			</motion.li>
		))}
	</motion.ol>
);

export default HowItWorksTimeline;