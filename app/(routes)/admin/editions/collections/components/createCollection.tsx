import axios from "axios";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ContainerApp from "@/components/ui/containerApp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


const formSchema = z.object({
  nazwa: z.string().min(2, {
    message: "Wpisz nazwe",
  }),
  cena: z.coerce.number().min(1, {
    message: "Wybierz cene",
  }),
})






const CreateCollection = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nazwa: "",
      cena: 1,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const data = {
        ...form.getValues(),
        editionId: id
      }
      await axios.post('/api/v1/collections/', data)
      navigate(`/admin/editions/${id}`)
      toast.success("Dodano Kolekcję")
      form.reset()

    } catch (error) {
      toast.error("Nie udało się dodać Kolekcji");
      console.log(error)

    }
  }

  return (
    <ContainerApp title="Dodaj Kartę" display={true}>
      <div className="flex gap-4">
        <div className='flex flex-col w-[40%] xl:px-20 xl:pr-40'>
          <Card>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="nazwa"
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
                    name="cena"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          Cena
                        </FormLabel>
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
    </ContainerApp>
  )
}

export default CreateCollection