"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  iquestion1: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  iquestion2: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  iquestion3: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  iquestion4: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  iquestion5: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  iquestion6: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  iquestion7: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  iquestion8: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iquestion1: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <>
    <div className="flex items-center h-full w-full bg-gradient-to-br from-black to-blue-400">
      <div className="w-full bg-white rounded shadow-lg p-10 m-10">
        <h1 className="block text-3xl w-full text-center text-grey-darkest mb-6">Individual Owner Signup</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest" >Please provide a short Description of your NFT's Character:</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest" >Tell us about your character's origin story. Where were they born? What was their upbringing like?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest" >What drives your character? What are their goals or dreams?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest" >What drives your character? What are their goals or dreams?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest">Does your character have any key relationships?  Do they have a family, a lover, a nemesis?  Tell us about their social circle?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest">How does your character respond in stressful situations?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest">How does your character feel about meeting others?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="iquestion8"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest">Please describe any flaws of your character</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col items-center">
              <Button className="" variant="outline" type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
      </div>
    </>
  )
}
