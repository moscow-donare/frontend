'use client'
import TeamMemberCard from "./components/member-card"
import ContactSection from "./components/contect-card"
import { TEAM_MEMBERS } from "./data/team-members"

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-muted-foreground mb-6">
            Somos un equipo comprometido con la transformación social a través de la tecnología Blockchain. En Donaré, creemos que
            pequeñas acciones pueden generar grandes cambios.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}
