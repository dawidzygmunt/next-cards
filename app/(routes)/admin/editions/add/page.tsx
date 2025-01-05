'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import AddSingleEdition from '@/actions/editions/add-single-edition'
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Wpisz nazwe',
  }),
})

const CreateEdition = () => {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await AddSingleEdition(values.name)
    if (result && 'error' in result) {
      toast.error('Nie udało się dodać Edycji')
      return
    }
    router.push('/admin/editions')
    toast.success('Dodano Edycję')
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-[40%] lg:w-[30%]">
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
                      <FormLabel className="flex mt-4 mb-4">
                        Nazwa Edycji
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Prawda czy wyzwanie..."
                          {...field}
                        />
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
  )
}

export default CreateEdition
