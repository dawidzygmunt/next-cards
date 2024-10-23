"use client"

import CreateTicket from "@/actions/tickets/create-ticket"
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
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const FormSchema = z.object({
  content: z.string().min(5),
  priority: z.coerce.number().int().min(1).max(5),
})

const ReportBug = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      priority: 1,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const ticket = await CreateTicket(data)
      toast.success("Activity added successfully")
    } catch (error) {
      toast.error("An error occurred")
      return
    }
  }

  return (
    <div className="flex w-full pt-20 justify-center">
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe your problem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your problem"
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
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How important it is? | 1 - 5</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Put your priority"
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ReportBug
