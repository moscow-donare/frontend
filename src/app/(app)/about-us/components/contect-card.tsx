import { Button, Card, CardBody, CardHeader } from "@heroui/react"
import { MailIcon, LinkedinIcon, InstagramIcon, FacebookIcon, TwitterIcon } from "lucide-react"
import { DONARE_INFO } from "../data/donare-info"
import Link from "next/link"

export default function ContactSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-10 text-center">Contáctanos</h2>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-center">¿Quieres saber más sobre Donaré?</h1>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Link href={`mailto:${DONARE_INFO.email}`}>
              <Button variant="faded" className="w-full justify-start">
                <MailIcon className="h-4 w-4 mr-2" />
                {DONARE_INFO.email}
              </Button>
            </Link>

            <Link href={DONARE_INFO.linkedin} target="_blank" rel="noopener noreferrer">
              <Button className="w-full justify-start">
                <LinkedinIcon className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </Link>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3 text-center">Síguenos en redes sociales</p>
            <div className="flex justify-center space-x-4">
              <Link href={DONARE_INFO.instagram} target="_blank" rel="noopener noreferrer">
                <Button isIconOnly variant="ghost">
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Link href={DONARE_INFO.facebook} target="_blank" rel="noopener noreferrer">
                <Button isIconOnly variant="ghost">
                  <FacebookIcon className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
              <Link href={DONARE_INFO.twitter} target="_blank" rel="noopener noreferrer">
                <Button isIconOnly variant="ghost">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}
