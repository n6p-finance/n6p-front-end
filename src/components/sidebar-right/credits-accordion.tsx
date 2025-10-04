"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { SongCredit } from "@/lib/types"

interface CreditsAccordionProps {
  credits: SongCredit[]
}

export function CreditsAccordion({ credits }: CreditsAccordionProps) {
  // Group credits by role
  const groupedCredits = credits.reduce(
    (acc, credit) => {
      if (!acc[credit.role]) {
        acc[credit.role] = []
      }
      acc[credit.role].push(credit)
      return acc
    },
    {} as Record<string, SongCredit[]>,
  )

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="credits" className="border-white/5">
        <AccordionTrigger className="text-sm font-semibold text-white hover:no-underline">Credits</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-2">
            {Object.entries(groupedCredits).map(([role, creditList]) => (
              <div key={role} className="space-y-1">
                <p className="text-xs font-medium text-gray-400">{role}</p>
                {creditList.map((credit) => (
                  <p key={credit.id} className="text-sm text-gray-300">
                    {credit.name}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
