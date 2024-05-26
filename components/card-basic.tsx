interface CardBasicProps {
  data: {
    typ: string;
    wersja: string;
    ilosc: number;
    tresc: string;
    kara: string;
  };
}

const CardBasic = ({ data }: CardBasicProps) => {
  return (
    <div className="flex">
      <div className="card shadow-xl w-[250px] h-[350px] rounded-lg relative border-black border-[1px]">
        <div className="font-bold text-4xl mb-4 text-center mt-3">
          <h1>{data.typ}</h1>
        </div>

        <div className="text-center m-8">{data.tresc}</div>

        <h5 className="absolute bottom-1 left-1">{data.wersja}</h5>

        <div className="absolute right-0 bottom-0">{data.kara}</div>
      </div>
    </div>
  );
};

export default CardBasic;
