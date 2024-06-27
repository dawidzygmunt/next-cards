"use client";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UseGetPlayers from "@/hooks/use-get-players";
import UsePostPlayer from "@/hooks/use-post-players";
import SinglePlayer from "./components/single-player";
import { useRouter } from "next/navigation";
import { Player } from "@prisma/client";

const formSchema = z.object({
  playerName: z
    .string()
    .min(3, {
      message: "Nazwa musi mieć conajmniej 3 znaki",
    })
    .max(12, {
      message: "Maksymalna długość to 12 znaków",
    }),
});

const NewGame = () => {
  const router = useRouter();
  const { data: players } = UseGetPlayers();
  const mutation = UsePostPlayer();

  const newGame = async () => {
    try {
      const response = await axios.get("/api/v1/cloneData");
      console.log(response.data.message);
    } catch (error) {
      console.log("blad" + error);
    }
  };

  const goMainButtonHandle: React.MouseEventHandler = () => {
    router.push("/game");
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center mt-20">
      <div className="bg-white shadow-xl px-10 py-4 pb-6 rounded-md">
        <h3>Nazwa Gracza</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex"
          >
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="playerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. Tomek"
                        {...field}
                        className="min-w-[250px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="ml-3 mt-[7px]">
                Dodaj
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="flex flex-col mt-20">
        {players &&
          players.map((player: Player) => (
            <SinglePlayer
              key={player.id}
              playerID={player.id}
              playerName={player.name}
            />
          ))}
      </div>
      <div>
        <Button className="mx-1" onClick={() => router.push("/")}>
          Wróć
        </Button>

        <Button className="mx-1" onClick={goMainButtonHandle}>
          Dalej
        </Button>
      </div>
    </div>
  );
};

export default NewGame;
