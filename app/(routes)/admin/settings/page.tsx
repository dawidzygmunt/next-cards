"use client"

import {
  Card as CardComponent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const Settings = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Ustawienia</h1>

      <div className="flex gap-4">
        <CardComponent className="w-[300px]">
          <CardHeader>
            <CardTitle>Przypisanie Kolekcji</CardTitle>
            <CardDescription>
              Sprawdź, które karty nie mają przypisanej kolekcji a następnie
              przypisz konkretne karty z gry Prawda czy Wyzwanie do kolekcji
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
              Przejdź
              <ChevronRight />
            </Button>
          </CardFooter>
        </CardComponent>

        <CardComponent className="w-[300px]">
          <CardHeader>
            <CardTitle>Konwertowanie do PDF</CardTitle>
            <CardDescription>
              W tym panelu przekonwertujesz stworzone karty do formatu pdf,
              gotowe do wydruku!
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("render-pdf")}>
              Przejdź
              <ChevronRight />
            </Button>
          </CardFooter>
        </CardComponent>
      </div>
    </div>
  )
}

export default Settings
