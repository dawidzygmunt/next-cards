import prisma from '@/lib/prisma'
import NewCardForm from './components/new-card-form'

const AdminNewCard = async () => {
  const collections = await prisma.collection.findMany()
  return <NewCardForm collections={collections} />
}

export default AdminNewCard
