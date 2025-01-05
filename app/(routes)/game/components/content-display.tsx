import { Card, Player } from '@prisma/client'

const ContentDisplay = ({ data }: { data: Card | undefined }) => {
  if (!data) {
    return <div>No data...</div>
  }
  return (
    <div className="px-10">
      <p className="text-2xl text-center text-white">{data.content}</p>
    </div>
  )
}

export default ContentDisplay
