import { tutorialSidebar } from '@/config/tutorial.config'
import TutorialLayoutClient from './TutorialLayoutClient'

export default function TutorialLayout({
  children,
  activeSlug,
}: {
  children: React.ReactNode
  activeSlug: string
}) {
  return (
    <TutorialLayoutClient activeSlug={activeSlug} tree={tutorialSidebar}>
      {children}
    </TutorialLayoutClient>
  )
}
