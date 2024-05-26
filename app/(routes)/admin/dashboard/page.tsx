"use client";
import { useEffect, useState } from "react";
import AnalysticTile from "./components/analysticComponent";
import axios from "axios";
import { Check, Diamond, Spade, TrendingUp } from "lucide-react";

const AdminPanel = () => {
  const [allBasic, setAllBasic] = useState<number>();
  const [truthBasic, setTruthBasic] = useState<number>();
  const [challengeBasic, setChallengeBasic] = useState<number>();
  const [collections, setCollections] = useState<number>();
  const [all, setAll] = useState<number>();
  const [truth, setTruth] = useState<number>();
  const [challenge, setChallenge] = useState<number>();

  const allCardsBasic = async () => {
    const response = await axios.get("/api/v1/statistics/all-basic");
    setAllBasic(response.data.nbHits);
  };

  const truthCardsBasic = async () => {
    const response = await axios.get("/api/v1/statistics/truth-basic");
    setTruthBasic(response.data.nbHits);
  };

  const challengeCardsBasic = async () => {
    const response = await axios.get("/api/v1/statistics/challenge-basic");
    setChallengeBasic(response.data.nbHits);
  };

  const allCards = async () => {
    const response = await axios.get("/api/v1/statistics/all");
    setAll(response.data.nbHits);
  };

  const truthCards = async () => {
    const response = await axios.get("/api/v1/statistics/truth");
    setTruth(response.data.nbHits);
  };

  const challengeCards = async () => {
    const response = await axios.get("/api/v1/statistics/challenge");
    setChallenge(response.data.nbHits);
  };

  const getcolections = async () => {
    const response = await axios.get("/api/v1/collections");
    console.log(response);

    setCollections(response.data.nbHits);
  };

  useEffect(() => {
    allCardsBasic();
    truthCardsBasic();
    challengeCardsBasic();
    allCards();
    truthCards();
    challengeCards();
    getcolections();
  }, []);

  return (
    <div className="flex">
      <div className="grid grid-cols-2 gap-6">
        <AnalysticTile
          title="Wszystkich kart"
          amount={allBasic as number}
          className="bg-blue-500"
        >
          <TrendingUp />
        </AnalysticTile>
        <AnalysticTile
          title="Kolekcje"
          amount={collections as number}
          className="bg-green-500"
        >
          <Spade />
        </AnalysticTile>
        <AnalysticTile
          title="Pytania"
          amount={truthBasic as number}
          className="bg-purple-500"
        >
          <Check />
        </AnalysticTile>
        <AnalysticTile
          title="Wyzwania"
          amount={challengeBasic as number}
          className="bg-red-500"
        >
          <Diamond />
        </AnalysticTile>
        <AnalysticTile title="Ilość edycji" amount={all as number} />
        <AnalysticTile title="Ilość kolekcji" amount={truth as number} />
        <AnalysticTile title="Wyzwań z powt" amount={challenge as number} />
      </div>
    </div>
  );
};

export default AdminPanel;
