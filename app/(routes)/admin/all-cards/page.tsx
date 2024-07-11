import getAllCards from "@/actions/cards/get-all-cards";
import { ContextMenu } from "@/components/ui/context-menu";
import toast from "react-hot-toast";
import AllCardsComponent from "./components/all-cards-component";
import PaginationControls from "./components/pagination-controls";

const SearchAllCards = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams["page"] || 1;
  const perPage = searchParams["perPage"] || 15;

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const cards = await getAllCards(Number(page), Number(perPage));
  if ("error" in cards) {
    toast.error("Something went wrong");
    return;
  }

  return (
    <>
      <PaginationControls
        hasNextPage={end <= cards.length}
        hasPrevPage={start > 0}
      />

      <AllCardsComponent cards={cards} />
    </>
  );
};

export default SearchAllCards;
