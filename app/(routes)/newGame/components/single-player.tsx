import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SinglePlayerProps {
  playerName: string;
  playerID: string;
}

const SinglePlayer: React.FC<SinglePlayerProps> = ({
  playerName,
  playerID,
}) => {
  const [shouldHide, setShouldHide] = useState(false);

  // delete player
  const handleDeleteButton = async () => {
    const response = await axios.delete("/api/v1/players/" + playerID);
    if (!response) {
      toast.error("Wystąpił błąd");
    } else {
      setShouldHide(true);
    }
  };

  return (
    <div className="container">
      <div
        className="flex justify-between items-center bg-white shadow-lg rounded-lg m-2 p-2 w-full min-w-[400px]"
        style={{ display: shouldHide ? "none" : "flex" }}
      >
        <h3 className="ml-2 text-xl">{playerName}</h3>
        <span>
          <Button
            variant="destructive"
            size="sm"
            className="mx-1 px-4 py-1 text-xs"
            onClick={handleDeleteButton}
          >
            <Trash2 size={15} />
          </Button>
        </span>
      </div>
    </div>
  );
};

export default SinglePlayer;
