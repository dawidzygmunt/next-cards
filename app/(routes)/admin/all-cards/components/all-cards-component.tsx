"use client";

import { ContextMenu } from "@/components/ui/context-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CardAllCards from "./card-all-cards";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PaginationControls from "./pagination-controls";

interface CardAllCardsProps {
  cards: ({
    Collection: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      price: number;
      editionId: string;
    } | null;
  } & {
    id: string;
    type: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    punishment: number;
    collectionId: string;
  })[];
}

const AllCardsComponent = ({ cards }: CardAllCardsProps) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex justify-center gap-8 flex-wrap rounded-lg p-5">
        {cards
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.content.toLowerCase().includes(search.toLowerCase());
          })
          .map((card) => {
            return (
              <div key={card.id}>
                <ContextMenu>
                  <CardAllCards data={card} key={card.id} />
                </ContextMenu>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllCardsComponent;
