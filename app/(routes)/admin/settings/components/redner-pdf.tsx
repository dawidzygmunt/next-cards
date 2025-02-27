import { useEffect, useState } from 'react'
import axiosClient from '@/lib/api-client'

const RenderPdf = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/api/v1/cards?page=1')
        setCards(response.data.cards)
        setLoading(false)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center gap-10 flex-wrap rounded-lg p-5">
      <span>Feature disabled</span>
    </div>
  )
}

export default RenderPdf
