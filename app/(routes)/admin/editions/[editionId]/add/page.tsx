"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "react-hot-toast"
import { addSingleCollection } from "@/actions/collections/add-single-collection"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Wpisz nazwe",
  }),
  price: z.coerce.number().min(1, {
    message: "Wybierz cene",
  }),
})

const CreateCollection = ({ params }: { params: { editionId: string } }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 4000,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await addSingleCollection(
      values.name,
      values.price,
      params.editionId
    )
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    toast.success("Dodano kolekcję")
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-[40%] xl:px-20 xl:pr-40">
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex mt-4">
                        Nazwa kolekcji
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Classic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex">Cena</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[180px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreateCollection
