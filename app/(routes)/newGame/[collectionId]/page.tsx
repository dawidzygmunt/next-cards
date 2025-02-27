'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useCreatePlayer from '@/hooks/players/use-create-player'
import useGetPlayers from '@/hooks/players/use-get-players'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SinglePlayer from './components/single-player'
import { ScrollArea } from '@/components/ui/scroll-area'
import GameNav from '@/components/game-nav'
import { useState } from 'react'
import toast from 'react-hot-toast'

const formSchema = z.object({
  playerName: z
    .string()
    .min(1, { message: 'Nazwa jest wymagana!' })
    .max(12, { message: 'Maksymalna długość to 12 znaków' }),
})

interface Player {
  id: string
  name: string
}

const NewGame = ({ params }: { params: { collectionId: string } }) => {
  const router = useRouter()
  const createPlayerMutation = useCreatePlayer()
  const [players, setPlayers] = useState<Player[]>([])
  const [genders, setGenders] = useState<Record<string, 'M' | 'F' | null>>({})

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newPlayer = {
      id: Date.now().toString(),
      name: values.playerName,
    }
    setPlayers([...players, newPlayer])
    setGenders((prev) => ({ ...prev, [newPlayer.id]: null }))

    // createPlayerMutation.mutate(values)
    form.reset()
  }

  const handleDeletePlayer = (playerId: string) => {
    setPlayers(players.filter((player) => player.id !== playerId))
    const newGenders = { ...genders }
    delete newGenders[playerId]
    setGenders(newGenders)
  }

  const handleStartGame: React.MouseEventHandler = () => {
    const allSelected = players?.every((player) => genders[player.id] !== null)

    if (!allSelected) {
      toast.error('Dla lepszej rozgrywki wybierz płeć dla każdego gracza')
      return
    }

    players.forEach((player) => {
      createPlayerMutation.mutate({
        playerName: player.name,
        gender: genders[player.id],
      })
    })

    router.push('/game')
  }

  const handleGenderSelect = (playerId: string, gender: 'M' | 'F') => {
    setGenders((prev) => ({ ...prev, [playerId]: gender }))
  }

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <GameNav
        title="dodaj graczy"
        href="/"
      />
      <div className="flex flex-col items-center px-7 pt-7">
        <div className="w-full">
          <div className="bg-white shadow-xl border border-black p-4 rounded-md mb-10 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex w-full"
              >
                <div className="flex justify-between w-full h-[70px] gap-4 ">
                  <FormField
                    control={form.control}
                    name="playerName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="np. Tomek"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="bg-[#0e34a0]"
                  >
                    Dodaj
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <ScrollArea
          className="h-[340px] w-full"
          // type="none"
        >
          <div className="flex flex-col w-full overflow-y-auto">
            {players &&
              players.map((player: Player) => (
                <SinglePlayer
                  key={player.id}
                  playerId={player.id}
                  playerName={player.name}
                  onGenderSelect={handleGenderSelect}
                  onDelete={handleDeletePlayer}
                />
              ))}
          </div>
        </ScrollArea>
      </div>
      <div className="bg-black/15 w-full p-8 rounded-bl-lg rounded-br-lg">
        <Button
          className="uppercase font-semibold text-4xl p-8 w-full "
          onClick={handleStartGame}
        >
          graj
        </Button>
      </div>
    </div>
  )
}

export default NewGame
