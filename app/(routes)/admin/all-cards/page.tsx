import axios from "axios";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import CardBasic from "@/components/card-basic";
import getAllCards from "@/actions/cards/get-all-cards";
import { Card } from "@prisma/client";
import toast from "react-hot-toast";

const SearchAllCards = async() => {
  const cards = await getAllCards()
  if ("error" in cards) {
    toast.error("Something went wrong")
    return
  }



  return (
    <div className="flex flex-col">

      <ScrollArea className="p-4 w-full h-[88vh]">
        <div className="flex justify-center gap-10 flex-wrap border rounded-lg p-5">
          {cards?.map((card: Card) => (
            <div key={card.id}>
              <CardBasic data={card} key={card.id} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchAllCards;
