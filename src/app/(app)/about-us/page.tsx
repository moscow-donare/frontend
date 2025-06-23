'use client'
import { Card, CardBody, Divider } from "@heroui/react"
import ContactSection from "./components/contact-card"
import TeamMemberCard from "./components/member-card"
import { TEAM_MEMBERS } from "./data/team-members"
import { HeartIcon, UsersIcon, TrendingUpIcon } from "lucide-react"

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sobre Nosotros
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-default-600 mb-4 leading-relaxed">
              Somos un equipo comprometido con la transformación social a través de la tecnología Blockchain.
            </p>
            <p className="text-xl text-default-600 mb-8 leading-relaxed">
              En Donaré, creemos que pequeñas acciones pueden generar grandes cambios.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <HeartIcon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Nuestra Misión</h3>
                <p className="text-sm text-default-500">
                  Facilitar y modernizar campañas solidarias con una solución digital segura, accesible y trazable que empodere a donantes y beneficiarios.                </p>
              </CardBody>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <UsersIcon className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Nuestra Visión</h3>
                <p className="text-sm text-default-500">
                  Ser la plataforma líder en América Latina para recaudar fondos personales y comunitarios con transparencia y seguridad mediante blockchain.                </p>
              </CardBody>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUpIcon className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Nuestro Impacto</h3>
                <p className="text-sm text-default-500">
                  Impulsar la confianza y la transparencia en la recaudación solidaria mediante blockchain.                </p>
              </CardBody>
            </Card>
          </div>
        </section>

        <Divider className="my-16" />

        {/* Team Members Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-4 text-center">Nuestro Equipo</h2>
          <p className="text-center text-default-600 mb-12 max-w-2xl mx-auto">
            Conoce a las personas apasionadas que hacen posible Donaré, cada una aportando su experiencia única para crear un impacto positivo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        <Divider className="my-16" />

        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  )
}