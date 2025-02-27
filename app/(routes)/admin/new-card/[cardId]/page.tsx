import prisma from '@/lib/prisma'
import AdminEditCard from './components/form'

const EditSingleCard = async ({ params }: { params: { cardId: string } }) => {
  console.log(params)
  const collections = await prisma.collection.findMany()
  const data = await prisma.card.findFirst({
    where: {
      id: params.cardId,
    },
    include: {
      Collection: true,
    },
  })

  if (!data || !collections || !data.Collection) {
    return <div>Nie mozna znalezc karty</div>
  }
  return (
    <>
      <AdminEditCard
        card={data}
        collections={collections}
      />
    </>
  )
}

export default EditSingleCard
