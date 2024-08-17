"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SinglePlayer from "./components/single-player"
import { useRouter } from "next/navigation"
import { Player } from "@prisma/client"
import { useEffect } from "react"
import useGetPlayers from "@/hooks/players/use-get-players"
import useCreatePlayer from "@/hooks/players/use-create-player"

const formSchema = z.object({
  playerName: z
    .string()
    .min(3, {
      message: "Nazwa musi mieć conajmniej 3 znaki",
    })
    .max(12, {
      message: "Maksymalna długość to 12 znaków",
    }),
})

const NewGame = () => {
  const router = useRouter()
  const { data: players } = useGetPlayers()
  const createPlayerMutation = useCreatePlayer()

  const goMainButtonHandle: React.MouseEventHandler = () => {
    router.push("/game")
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    createPlayerMutation.mutate(values)
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center pt-20 lg:mt-20 p-3">
      <div>
        <div className="bg-white shadow-xl border border-black p-4 sm:px-10 py-4 pb-6 rounded-md">
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
                          className="lg:min-w-[250px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="ml-3 mt-[7px] bg-[#0e34a0]">
                  Dodaj
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex flex-col mt-10 lg:mt-20 w-full">
          {players &&
            players.map((player: Player) => (
              <SinglePlayer
                key={player.id}
                playerID={player.id}
                playerName={player.name}
              />
            ))}
        </div>
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
  )
}

export default NewGame
