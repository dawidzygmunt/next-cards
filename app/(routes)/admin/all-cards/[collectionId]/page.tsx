import prisma from '@/lib/prisma'
import AllCardsComponent from '../components/all-cards-component'

const FiltratedAllCards = async ({
  params,
}: {
  params: { collectionId: string }
}) => {
  if (!params.collectionId) {
    return <div>Nie mozna pobrac kart</div>
  }

  const data = await prisma.card.findMany({
    where: {
      collectionId: params.collectionId,
    },
    include: {
      Collection: true,
    },
  })
  return (
    <>
      {/* <PaginationControls
        hasNextPage={end <= cards.length}
        hasPrevPage={start > 0}
      /> */}

      <AllCardsComponent cards={data} />
    </>
  )
}

export default FiltratedAllCards
