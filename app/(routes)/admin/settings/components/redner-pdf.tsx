import Card from "@/components/gameMain/card"
import { useEffect, useState } from "react"
import { Card as CardType } from "types"
import axios from "axios"

const RenderPdf = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/cards?page=1")
        setCards(response.data.cards)
        setLoading(false) // Ustawiamy loading na false po pomyślnym pobraniu danych
      } catch (error) {
        console.error("Błąd pobierania danych:", error)
        setLoading(false) // Ustawiamy loading na false w przypadku błędu
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center gap-10 flex-wrap rounded-lg p-5">
      {cards?.map((card: CardType) => (
        <div key={card._id}>
          <Card data={card} key={card._id} />
        </div>
      ))}
    </div>
  )
}

export default RenderPdf
