"use client";
import deleteSingleEdition from "@/actions/editions/delete-single-edition";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Edition } from "@prisma/client";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import toast from "react-hot-toast";

const SingleEdition = ({ edition }: { edition: Edition }) => {
  const [display, setDisplay] = useState(true);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    const result = await deleteSingleEdition(edition.id);
    if ("error" in result) {
      toast.error("Nie udało się usunąć Edycji");
      return;
    }
    toast.success("Usunięto Edycję");
    revalidatePath("/admin/editions");
  };

  return (
    <>
      {display && (
        <div className="mx-2">
          <ContextMenu>
            <ContextMenuTrigger>
              <div
                className="w-[200px] h-[200px] bg-red-200 rounded-xl flex justify-center items-center
              text-center hover:bg-red-300 hover:cursor-pointer transition-all duration-300 "
              >
                <div className="text-center flex flex-col justify-center items-center">
                  {edition.name}
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
      )}
    </>
  );
};

export default SingleEdition;
