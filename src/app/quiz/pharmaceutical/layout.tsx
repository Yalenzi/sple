import type { Metadata } from 'next'
import { PharmaceuticalQuizWrapper } from './PharmaceuticalQuizWrapper'

export const metadata: Metadata = {
  title: 'Pharmaceutical Sciences Quiz - PharmaQuest',
  description: 'Test your knowledge in pharmaceutical sciences with interactive questions',
}

export default function PharmaceuticalQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PharmaceuticalQuizWrapper>
      {children}
    </PharmaceuticalQuizWrapper>
  )
}
