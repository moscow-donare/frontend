"use client"

import React from 'react';
import { 
  Shield, Zap, Heart, Lock, Eye, BarChart, CheckCircle,
  Database, ChevronRight, X, MapPin, Slash, Clock, Check, FileText, ArrowRightLeft
} from 'lucide-react';
import Link from 'next/link';
import { Card } from "@heroui/react";
import { motion } from 'framer-motion';
import ComparativeSection from './components/ComparativeSection';
import FeatureCards from './components/FeatureCards';
import HowItWorksTimeline from './components/HowItWorksTimeline';
import BlockchainImageCard from './components/BlockchainImageCard';
import JoinDonareCards from './components/JoinDonareCards';

const HowItWorks: React.FC = () => {
  // Variantes de animación para la sección "¿Cómo Funciona?"
  const imageCardMotionProps = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeInOut", delay: 0.2 } // Corregido a string
  };

  const listMotionProps = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.7, // Inicia después de que la tarjeta de imagen comience a aparecer
          staggerChildren: 0.4 // Tiempo entre la animación de cada elemento de la lista
        }
      }
    }
  };
  const listItemMotionVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } // Corregido a string
  };

  // Variantes para la sección "Únete a Donaré" (con entrada y salida)
  const sectionJoinTitleMotion = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }, // Estado al salir (aunque whileInView con once:false lo maneja volviendo a initial)
    transition: { duration: 0.5 },
    viewport: { once: false } // Animar cada vez que entra/sale
  };

  const sectionJoinCardsContainerMotion = {
    initial: "hidden",
    whileInView: "visible",
    exit: "hidden", // Revertir al estado hidden al salir
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
    // No necesita viewport u initial aquí, lo hereda del contenedor
  };

  return (
    <div>
      <motion.section 
        className="bg-gradient-to-br from-primary to-secondary text-white py-16 md:py-24"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } }
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            Revolucionando la <span className="text-purple-300">Transparencia</span> en Donaciones
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8 text-teal-100 max-w-3xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
            }}
          >
            Donaré utiliza la tecnología blockchain para garantizar que cada donación sea transparente, 
            verificable y llegue a su destino sin intermediarios.
          </motion.p>
        </div>
      </motion.section>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué <span className="text-teal-600">Don</span><span className="text-sky-500">aré</span>?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Desarrollamos Donaré para solucionar los problemas de confianza y transparencia en 
              el sector de donaciones y recaudación de fondos.
            </p>
          </div>
          <ComparativeSection />
          <FeatureCards />
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo Funciona?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              La tecnología blockchain nos permite crear un sistema completamente transparente donde 
              cada paso del proceso es verificable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <HowItWorksTimeline />
            <BlockchainImageCard />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }} // Para que se anime al entrar y salir (revirtiendo a initial)
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4"
              {...sectionJoinTitleMotion} // Aplica las props de animación definidas
            >
              Únete a Donaré
            </motion.h2>
            <motion.p 
              className="text-teal-100 max-w-3xl mx-auto"
              {...sectionJoinTitleMotion} // Reutiliza las props, ajusta delay si es necesario
              transition={{ ...sectionJoinTitleMotion.transition, delay: 0.1 }} // Pequeño delay para el párrafo
            >
              Sé parte de la revolución en la forma de hacer donaciones y ayudar a causas importantes.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            {...sectionJoinCardsContainerMotion} // Aplica las props de animación al contenedor de las tarjetas
          >
            <motion.div {...sectionJoinCardItemMotion} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 rounded-full p-3 inline-block mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Haz una Donación</h3>
                <p className="text-teal-100 mb-4">
                  Apoya causas importantes con la seguridad de que tu dinero llegará a quien lo necesita.
                </p>
                <Link 
                  href="/" // Debería ser /campaigns o similar
                  className="inline-flex items-center text-white font-medium hover:text-teal-100 mt-auto"
                >
                  Ver campañas <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div {...sectionJoinCardItemMotion} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 rounded-full p-3 inline-block mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Crea una Campaña</h3>
                <p className="text-teal-100 mb-4">
                  Inicia tu propia campaña para financiar un proyecto o ayudar a quien lo necesite.
                </p>
                <Link 
                  href="/campaigns/create" // Corregido de /create
                  className="inline-flex items-center text-white font-medium hover:text-teal-100 mt-auto"
                >
                  Crear campaña <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div {...sectionJoinCardItemMotion} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 rounded-full p-3 inline-block mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verifica Transparencia</h3>
                <p className="text-teal-100 mb-4">
                  Consulta el registro blockchain para verificar cada transacción realizada en la plataforma.
                </p>
                <Link 
                  href="/" // Debería ser una página específica del explorador blockchain si existe
                  className="inline-flex items-center text-white font-medium hover:text-teal-100 mt-auto"
                >
                  Explorar blockchain <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;