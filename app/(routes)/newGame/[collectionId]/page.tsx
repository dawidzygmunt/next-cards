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
import { Player } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SinglePlayer from './components/single-player'
import { ScrollArea } from '@/components/ui/scroll-area'
import GameNav from '@/components/game-nav'

const formSchema = z.object({
  playerName: z
    .string()
    .min(3, {
      message: 'Nazwa musi mieć conajmniej 3 znaki',
    })
    .max(12, {
      message: 'Maksymalna długość to 12 znaków',
    }),
})

const NewGame = ({
  searchParams,
}: {
  searchParams: { collectionId: string }
}) => {
  const router = useRouter()
  const { data: players } = useGetPlayers()
  const createPlayerMutation = useCreatePlayer()

  const goMainButtonHandle: React.MouseEventHandler = () => {
    router.push('/game')
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    createPlayerMutation.mutate(values)
    form.reset()
  }

  return (
    <>
      <GameNav
        title="dodaj graczy"
        href="/"
      />
      <div className="flex flex-col items-center pt-10 lg:pt-16 px-7">
        <div className="w-full">
          <div className="bg-white shadow-xl border border-black p-4 rounded-md mb-10 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex w-full"
              >
                <div className="flex justify-between w-full gap-6">
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
          className="h-[400px] w-full"
          // type="none"
        >
          <div className="flex flex-col w-full overflow-y-auto">
            {players &&
              players.map((player: Player) => (
                <SinglePlayer
                  key={player.id}
                  playerId={player.id}
                  playerName={player.name}
                />
              ))}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 bg-black/15 w-full p-8">
          <Button
            className="uppercase font-semibold text-4xl p-8 w-full "
            onClick={goMainButtonHandle}
          >
            graj
          </Button>
        </div>
      </div>
    </>
  )
}

export default NewGame
