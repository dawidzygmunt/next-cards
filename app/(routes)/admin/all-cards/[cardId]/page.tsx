"use client"

import * as z from "zod"
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Card as BasicCard, CardContent } from "@/components/ui/card"

import { toast } from "react-hot-toast"

import { Textarea } from "@/components/ui/textarea"
import CardBasic from "@/components/card-basic"
import { useEffect, useState } from "react"
import getAllCollectionsForTruthOrDare from "@/actions/cards/get-all-collections-for-truth-or-dare"
import { Card, Collection } from "@prisma/client"
import { newCardFormSchema } from "@/schemas/new-card-form-schema"

import editSingleCard from "@/actions/cards/edit-single-card"
import getSingleCard from "@/actions/cards/get-single-card"
import { useRouter } from "next/navigation"

const AdminEditCard = ({ params }: { params: { cardId: string } }) => {
  const [data, setData] = useState<Collection[]>([])
  const [card, setCard] = useState<Card>()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCollectionsForTruthOrDare()
      if ("error" in result) {
        toast.error(result.error)
        return
      }
      setData(result)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSingleCard(params.cardId)
      if ("error" in result) {
        toast.error(result.error)
        return
      }
      setCard(result)
    }
    fetchData()
  }, [])
  // 1. Define your form.
  const form = useForm<z.infer<typeof newCardFormSchema>>({
    resolver: zodResolver(newCardFormSchema),
    defaultValues: {
      type: card?.type,
      collectionId: card?.collectionId,
      amount: card?.amount,
      content: card?.content,
      punishment: card?.punishment,
    },
  })

  useEffect(() => {
    if (card) {
      form.reset({
        type: card.type,
        collectionId: card.collectionId,
        content: card?.content,
        amount: card.amount,
        punishment: card.punishment,
      })
    }
  }, [card, form])

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof newCardFormSchema>) {
    if (!card) {
      toast.error("Card not found")
      return
    }
    const result = await editSingleCard(card.id, values)
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    router.push("/admin/all-cards")
    toast.success("Zaktualizowano kartę")
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col min-w-[800px] xl:px-20 xl:pr-40">
        <BasicCard>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full flex text-black font-bold my-2 mt-7 text-2xl justify-center ">
                            <SelectValue placeholder="Prawda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Prawda">Prawda</SelectItem>
                          <SelectItem value="Wyzwanie">Wyzwanie</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="collectionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex ">Wersja</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-[180px] text-black">
                            <SelectValue placeholder="Wybierz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data.map((collection) => (
                            <SelectItem
                              key={collection.id}
                              value={collection.id}
                            >
                              {collection.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex">Ilość powtórzeń</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" className="w-[180px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex ">Treść</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Wpisz tutaj treść zadania lub pytania"
                          className="resize-y min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="punishment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kara</FormLabel>
                      <FormControl>
                        <div className="flex justify-center gap-10 text-2xl ">
                          <Button
                            onClick={() => field.onChange("1")}
                            type="button"
                          >
                            1
                          </Button>
                          <Button
                            onClick={() => field.onChange("2")}
                            type="button"
                          >
                            2
                          </Button>
                          <Button
                            onClick={() => field.onChange("3")}
                            type="button"
                          >
                            3
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </BasicCard>
      </div>

      <div className="flex flex-col gap-10 w-full justify-center relative">
        <CardBasic data={{ ...form }.watch()} />
      </div>
    </div>
  )
}

export default AdminEditCard
