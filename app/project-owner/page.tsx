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
  pquestion1: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  pquestion2: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
  pquestion3: z.string().min(10, {
    message: "The answer should be a minimum 10 characters",
  }),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pquestion1: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Storing values", values);
    localStorage.setItem('projectAnswers', JSON.stringify(values));

  }
  return (
    <>
    <div className="flex items-center h-screen w-full bg-gradient-to-br from-black to-blue-400">
      <div className="w-full bg-white rounded shadow-lg p-10 m-10">
        <h1 className="block text-3xl w-full text-center text-grey-darkest mb-6">Project Owner Signup</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col mb-4">
            <FormField
              control={form.control}
              name="pquestion1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest" >Great!  Now, help your holders out by providing some of the story behind the collection.  What is the lore or storytelling. What has happened to date within the history of the collection?</FormLabel>
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
              name="pquestion2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest" >Great, now its time to create some scenarios.  Describe a few settings where your NFTs might interact?  For example on a foreign planet that is full of enriching scoozy crystals or in a metaverse world called MetaLand that features high stakes casinos and race cars.    With each scenario you can describe a goal that your NFT owners can try to accomplish through interacting with each other.</FormLabel>
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
              name="pquestion3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 font-bold text-grey-darkest" >Would you like to include a prize for users that complete the challenge?  If so, please specify what the prize would be.</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 text-grey-darkest" placeholder="Please type out your answer here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="flex flex-col items-center">
              <Button variant="outline" type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
      </div>
    </>
  )
}
