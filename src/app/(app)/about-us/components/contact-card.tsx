import { Button, Card, CardBody, CardHeader } from "@heroui/react"
import { MailIcon, LinkedinIcon, InstagramIcon } from "lucide-react"
import { DONARE_INFO } from "../data/donare-info"
import { TikTokIcon } from "@public/icons/TikTokIcon"
import Link from "next/link"

export default function ContactSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-10 text-center">Contáctanos</h2>
      <Card className="max-w-xl mx-auto shadow-lg">
        <CardHeader className="text-center pb-2">
          <p className="text-sm text-default-500 mt-2 text-center">
            Estamos aquí para responder tus preguntas y colaborar contigo.
          </p>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Link href={`mailto:${DONARE_INFO.email}`}>
              <Button 
                variant="bordered" 
                className="w-full justify-start h-12"
                startContent={<MailIcon className="h-4 w-4" />}
              >
                {DONARE_INFO.email}
              </Button>
            </Link>

            <Link href={DONARE_INFO.linkedin} target="_blank" rel="noopener noreferrer">
              <Button 
                className="w-full justify-start h-12" 
                color="secondary"
                startContent={<LinkedinIcon className="h-4 w-4" />}
              >
                Síguenos en LinkedIn
              </Button>
            </Link>
          </div>

          <div>
            <p className="text-sm text-default-500 mb-4 text-center font-medium">
              Síguenos en redes sociales
            </p>
            <div className="flex justify-center space-x-3">
              <Link href={DONARE_INFO.instagram} target="_blank" rel="noopener noreferrer">
                <Button 
                  isIconOnly 
                  variant="ghost" 
                  className="hover:bg-pink-100 hover:text-pink-600 transition-colors"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Link href={DONARE_INFO.tiktok} target="_blank" rel="noopener noreferrer">
                <Button 
                  isIconOnly 
                  variant="ghost"
                  className="hover:bg-shadow-neutral-100 hover:text-shadow-neutral-600 transition-colors"
                >
                  <TikTokIcon/>
                  <span className="sr-only">TikTok</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}