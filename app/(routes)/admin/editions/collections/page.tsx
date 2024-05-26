import ContainerApp from "@/components/ui/containerApp";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";
import SingleCollection from "./components/single-collection";

interface Collection {
  nazwa: string;
  cena: number;
  _id: string;
}

const GameCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataSingle, setDataSingle] = useState<Collection | null>(null);
  const [data, setData] = useState<Collection[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/v1/editions/${id}`);
      setDataSingle(response.data.editions);
    };

    getData();
  }, [id]);

  useEffect(() => {
    const getEdition = async () => {
      const response = await axios.get(`/api/v1/editions/${id}`);
      const collectionsIds = response.data.editions.kolekcja;

      collectionsIds.forEach(async (colectionId: string) => {
        try {
          console.log("collectionID: " + colectionId);
          const response = await axios.get(
            `/api/v1/collections/${colectionId}`
          );
          console.log(response);
          if (response.data.collections.length !== 0) {
            setData((prevData) => [...prevData, response.data.collections]);
          }
        } catch (error) {
          console.log(error);
        }
      });
    };
    getEdition();
  }, [id]);

  if (!data || !dataSingle) return <div>Loading...</div>;

  return (
    <ContainerApp title={dataSingle?.nazwa} display={true}>
      <div className="flex m-10 flex-wrap">
        {/* Create new collection button */}
        <div
          className="w-[200px] h-[200px] bg-slate-400 rounded-xl flex justify-center items-center
          text-center hover:bg-slate-300 hover:cursor-pointer transition-all duration-300 m-2"
          onClick={() => navigate(`/admin/collections/add/${id}`)}
        >
          <div className="text-center flex flex-col justify-center items-center">
            Dodaj nową kolekcję
            <Plus className="mt-1" />
          </div>
        </div>

        {data &&
          data.map((item) => (
            <Link key={item._id} to={`/admin/all-cards/${item._id}`}>
              <SingleCollection data={item} />
            </Link>
          ))}
      </div>
    </ContainerApp>
  );
};

export default GameCollection;
