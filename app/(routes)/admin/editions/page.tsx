import ContainerApp from '@/components/ui/containerApp'
import SingleEdition from './components/singleEdition'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import axios from 'axios'

interface Collection {
  nazwa: string,
  _id: string,
}



const CardEditions = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<Collection[]>([]);

  useEffect(() => {
    const getCollections = async () => {
      const response = await axios.get('/api/v1/editions')
      console.log(response.data.editions);

      setData(response.data.editions)
    }

    getCollections()
  }, [])

  return (
    <ContainerApp title="Wszystkie gry" display={true}>
      <div className='flex m-10'>
        {/* Create new collection button */}
        <div
          className="w-[200px] h-[200px] bg-slate-400 rounded-xl flex justify-center items-center
          text-center hover:bg-slate-300 hover:cursor-pointer transition-all duration-300 mx-2"
          onClick={() => navigate('/admin/editions/add')}
        >
          <div className="text-center flex flex-col justify-center items-center">
            Dodaj nową Edycję
            <Plus className='mt-1' />
          </div>
        </div>


        {data && data.map((item) => (
          <Link key={item._id} to={`/admin/editions/${item._id}`}>
            <SingleEdition data={item} />
          </Link>
        ))}

      </div>
    </ContainerApp>
  )
}

export default CardEditions