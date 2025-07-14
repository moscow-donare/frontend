// Instalar dependencias necesarias para el formulario
import { execSync } from "child_process"

const dependencies = ["react-hook-form", "zod", "@hookform/resolvers"]

console.log("Instalando dependencias...")
dependencies.forEach((dep) => {
  try {
    execSync(`npm install ${dep}`, { stdio: "inherit" })
    console.log(`✅ ${dep} instalado correctamente`)
  } catch (error) {
    console.error(`❌ Error instalando ${dep}:`, error.message)
  }
})

console.log("🎉 Todas las dependencias instaladas")