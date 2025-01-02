import prisma from '@/lib/prisma'
import AdminEditCard from './components/form'

const EditSingleCard = async ({
  params,
}: {
  params: { collectionId: string }
}) => {
  const collections = await prisma.collection.findMany()
  const data = await prisma.card.findFirst({
    where: {
      collectionId: params.collectionId,
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
