'use client'

import CreateTicket from '@/actions/tickets/create-ticket'
import GameNav from '@/components/game-nav'
import { IPhoneFrame } from '@/components/iphone-frame'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const FormSchema = z.object({
  content: z.string().min(5),
  priority: z.string(),
})

const ReportBug = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const parsedData = {
        content: data.content,
        priority: Number(data.priority),
      }
      const ticket = await CreateTicket(parsedData)
      toast.success('Send successfully')
    } catch (error) {
      toast.error('An error occurred')
      return
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <IPhoneFrame>
          <GameNav
            href="/"
            title="Zgłoś błąd"
            // className="bg-white text-black"
          />
          <div className="">
            <div className="rounded-s-xl shadow-xl md:max-h-[80vh]">
              <Image
                src="/cards/bug-image.jpg"
                alt="Descriptive text for screen readers "
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col items-start px-12 lg:w-full lg:h-full bg-[#ffffff] shadow-xl text-[#203020] p-10">
              <h2 className="text-2xl text-left mb-7">Zgłoś błąd</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 w-full "
                >
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz wagę problemu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">niska</SelectItem>
                          <SelectItem value="2">średnia</SelectItem>
                          <SelectItem value="3">wysoka</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea
                            placeholder="Opowiedz nam o tym, co się stało"
                            className="resize-y min-h-[250px] max-h-[350px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="px-10 bg-[#ad4032] hover:bg-[#c74b3b]"
                  >
                    Wyślij
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </IPhoneFrame>
      </div>
      <div className="flex w-full min-h-screen justify-center items-center bg-gradient-to-r from-violet-300 to-fuchsia-300 sm:hidden">
        <div className="w-full lg:w-auto grid grid-cols-1 md:grid-cols-2 lg:px-24 ">
          <div className="rounded-s-xl shadow-xl md:max-h-[80vh]">
            <Image
              src="/cards/bug-image.jpg"
              alt="Descriptive text for screen readers "
              width={600}
              height={700}
              className="rounded-s-xl object-cover md:max-h-[80vh] w-full h-full "
            />
          </div>

          <div className="flex flex-col items-start px-12 lg:w-full lg:h-full bg-[#ffffff] shadow-xl text-[#203020] p-10">
            <h2 className="text-2xl text-left mb-7">Zgłoś błąd</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full "
              >
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz wagę problemu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">niska</SelectItem>
                        <SelectItem value="2">średnia</SelectItem>
                        <SelectItem value="3">wysoka</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Opowiedz nam o tym, co się stało"
                          className="resize-y min-h-[250px] max-h-[350px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="rounded-3xl px-10 bg-purple-700"
                >
                  Wyślij
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportBug
