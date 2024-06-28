"use client"
import { deleteSingleCollection } from "@/actions/collections/delete-single-collection"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Collection } from "@prisma/client"
import axios from "axios"
import { Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const SingleCollection = ({ collection }: { collection: Collection }) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    const result = await deleteSingleCollection(collection.id)
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    toast.success("Usunięto kolekcję")
  }

  return (
    <>
      <div>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className="w-[200px] h-[200px] bg-red-200 rounded-xl flex justify-center items-center
                  text-center hover:bg-red-300 hover:cursor-pointer transition-all duration-300 "
            >
              <div className="text-center flex flex-col justify-center items-center">
                {collection.name}
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={handleEdit}>
              <Edit size={18} className="mr-2" /> Edytuj
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDelete}>
              {" "}
              <Trash2 size={18} className="mr-2" />
              Usuń
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>
  )
}

export default SingleCollection
