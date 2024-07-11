import getAllCards from "@/actions/cards/get-all-cards";
import { ContextMenu } from "@/components/ui/context-menu";
import toast from "react-hot-toast";
import CardAllCards from "./components/card-all-cards";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AllCardsComponent from "./components/all-cards-component";

const SearchAllCards = async () => {
  const cards = await getAllCards();
  if ("error" in cards) {
    toast.error("Something went wrong");
    return;
  }

  return <AllCardsComponent cards={cards} />;
};

export default SearchAllCards;
