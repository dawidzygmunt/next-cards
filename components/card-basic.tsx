interface Card {
  type: string
  content: string
  amount: number
  punishment: number
  collectionId: string
}

const CardBasic = ({ data }: { data: Card }) => {
  return (
    <div className="flex">
      <div className="card shadow-xl w-[250px] h-[350px] rounded-lg relative border-black border-[1px]">
        <div className="absolute top-0 left-0">{data.amount}</div>
        <div className="font-bold text-4xl mb-4 text-center mt-3">
          <h1>{data.type}</h1>
        </div>

        <div className="text-center m-8">{data.content}</div>

        <h5 className="absolute bottom-1 left-1">{data.collectionId}</h5>

        <div className="absolute right-0 bottom-0">{data.punishment}</div>
      </div>
    </div>
  )
}

export default CardBasic
