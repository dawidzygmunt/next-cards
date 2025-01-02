'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Card, CardContent } from '@/components/ui/card'

import { toast } from 'react-hot-toast'

import { Textarea } from '@/components/ui/textarea'
import CardBasic from '@/components/card-basic'
import { useEffect, useState } from 'react'
import getAllCollectionsForTruthOrDare from '@/actions/cards/get-all-collections-for-truth-or-dare'
import { Collection } from '@prisma/client'

import { newCardFormSchema } from '@/schemas/new-card-form-schema'
import { createSingleCard } from '@/actions/cards/create-single-card'

const AdminNewCard = () => {
  const [data, setData] = useState<Collection[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCollectionsForTruthOrDare()
      if ('error' in result) {
        toast.error(result.error)
        return
      }
      setData(result)
    }
    fetchData()
  }, [])
  // 1. Define your form.
  const form = useForm<z.infer<typeof newCardFormSchema>>({
    resolver: zodResolver(newCardFormSchema),
    defaultValues: {
      type: 'Prawda',
      collectionId: data[0]?.id || '',
      amount: 1,
      punishment: 1,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof newCardFormSchema>) {
    const result = await createSingleCard(values)
    if ('error' in result) {
      toast.error(result.error)
      return
    }
    toast.success('Dodano kartę')
  }

  return (
    <div className="flex flex-col">
      <h1>Add new card</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col items-center ">
          <Card className="w-full max-w-[700px]">
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
                          <Input
                            {...field}
                            type="number"
                            className="w-[180px]"
                          />
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
                              onClick={() => field.onChange('1')}
                              type="button"
                            >
                              1
                            </Button>
                            <Button
                              onClick={() => field.onChange('2')}
                              type="button"
                            >
                              2
                            </Button>
                            <Button
                              onClick={() => field.onChange('3')}
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
          </Card>
        </div>

        <div className="flex flex-col w-full items-center justify-center pb-24">
          <CardBasic data={{ ...form }.watch()} />
        </div>
      </div>
    </div>
  )
}

export default AdminNewCard
