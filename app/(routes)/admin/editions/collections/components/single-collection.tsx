import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import axios from "axios"
import { Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface SingleCollectionProps {
  data: {
    _id: string,
    nazwa: string,
    cena: number
  }
}



const SingleCollection: React.FC<SingleCollectionProps> = ({
  data,
}) => {

  const [display, setDisplay] = useState(true)

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    await axios.delete(`/api/v1/collections/${data._id}`)
    setDisplay(false)
  }



  return (
    <>
      {display &&
        <div className="m-2">
          <ContextMenu>
            <ContextMenuTrigger>
              <div
                className="w-[200px] h-[200px] bg-red-200 rounded-xl flex justify-center items-center
                  text-center hover:bg-red-300 hover:cursor-pointer transition-all duration-300 "
              >
                <div className="text-center flex flex-col justify-center items-center">
                  {data.nazwa}
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={handleEdit}><Edit size={18} className="mr-2" /> Edytuj</ContextMenuItem>
              <ContextMenuItem onClick={handleDelete}> <Trash2 size={18} className="mr-2" />Usuń</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

        </div>
      }
    </>
  )
}

export default SingleCollection