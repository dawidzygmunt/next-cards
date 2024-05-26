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
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
  nazwa: z.string().min(2, {
    message: "Wpisz nazwe",
  }),
})






const CreateEdition = () => {

  const navigate = useNavigate()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nazwa: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const data = form.getValues();
      await axios.post('/api/v1/editions/', data)
      navigate("/admin/editions/")
      toast.success("Dodano Edycję")
      form.reset()

    } catch (error) {
      toast.error("Nie udało się dodać Edycji")
    }
  }

  return (
    <ContainerApp title="Dodaj Edycje" display={true}>
      <div className="flex gap-4">
        <div className='flex flex-col w-[40%] lg:w-[30%] '>
          <Card>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="nazwa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mt-4 mb-4">
                          Nazwa Edycji
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Prawda czy wyzwanie..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Dodaj</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContainerApp>
  )
}

export default CreateEdition