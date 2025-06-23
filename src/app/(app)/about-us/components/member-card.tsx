import { Button, Card, CardBody, CardFooter, Avatar } from "@heroui/react"
import { LinkedinIcon, GraduationCapIcon } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: StaticImageData
  linkedin: string
}

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardBody className="pt-8 pb-4 text-center">
        <div className="flex justify-center mb-4">
          <Image
            width={96}
            height={96}
            src={member.image}
            alt={`Foto de ${member.name}`}
            className="w-24 h-24 text-large"
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
        
        <div className="flex items-center justify-center gap-2 mb-3">
          <GraduationCapIcon className="h-4 w-4 text-default-500" />
          <p className="text-sm text-default-600 font-medium">{member.role}</p>
        </div>
        
        <p className="text-sm text-default-500 leading-relaxed">{member.bio}</p>
      </CardBody>
      
      <CardFooter className="border-t pt-4">
        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button 
            className="w-full" 
            variant="bordered"
            startContent={<LinkedinIcon className="h-4 w-4" />}
          >
            Ver LinkedIn
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}