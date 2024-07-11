interface Card {
  type: string;
  content: string;
  amount: number;
  punishment: number;
  collectionName: string;
}

const CardBasic = ({ data }: { data: Card }) => {
  return (
    <div className="flex">
      <div className="card shadow-xl w-[250px] h-[350px] rounded-lg relative border-black border-[1px]">
        <div
          className="absolute flex top-0 left-0 bg-red-500 w-[20px] h-[20px] justify-center items-center 
          text-center text-xs text-white rounded-full -translate-x-1 -translate-y-1"
        >
          <span>{data.amount}</span>
        </div>
        <div className="font-bold text-4xl mb-4 text-center mt-3">
          <h1>{data.type}</h1>
        </div>

        <div className="text-center m-8">{data.content}</div>

        <h5 className="absolute bottom-1 left-1">{data.collectionName}</h5>

        <div className="absolute right-0 bottom-0">{data.punishment}</div>
      </div>
    </div>
  );
};

export default CardBasic;
