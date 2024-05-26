"use client";
import axios from "axios";
import { useState, useEffect } from "react";

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

const SearchAllCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePrevious = async () => {
    if (currentPage === 1) {
      return;
    }
    const response = await axios.get(
      "/api/v1/cards?page=" + (currentPage - 1).toString()
    );
    setCurrentPage(currentPage - 1);
    setCards(response.data.cards);
  };

  const handleNext = async () => {
    const response = await axios.get(
      "/api/v1/cards?page=" + (currentPage + 1).toString()
    );
    setCurrentPage(currentPage + 1);
    setCards(response.data.cards);
    console.log(cards);
    console.log("Strona: " + currentPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Input placeholder="Search" />
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePrevious} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <ScrollArea className="p-4 w-full h-[88vh]">
        <div className="flex justify-center gap-10 flex-wrap border rounded-lg p-5">
          {cards?.map((card: any) => (
            <div key={card._id}>
              <CardBasic data={card} key={card._id} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchAllCards;
