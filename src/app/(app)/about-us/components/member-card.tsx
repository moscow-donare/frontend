import { Button, Card, CardBody, CardFooter } from "@heroui/react"
import { LinkedinIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  linkedin: string
}

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative bg-red-300">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={`Foto de ${member.name}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardBody className="pt-6">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
        <p className="text-sm">{member.bio}</p>
      </CardBody>
      <CardFooter className="border-t pt-4">
        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full">
            <LinkedinIcon className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
