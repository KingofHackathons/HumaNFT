"use client"

import { useRouter } from 'next/navigation'

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
  //iquestion1: z.string().min(10, {
    //message: "The answer should be a minimum 10 characters",
  //}),
  //iquestion2: z.string().min(10, {
    //message: "The answer should be a minimum 10 characters",
  //}),
  //iquestion3: z.string().min(10, {
    //message: "The answer should be a minimum 10 characters",
  //}),
  //iquestion4: z.string().min(10, {
    //message: "The answer should be a minimum 10 characters",
  //}),
  //iquestion5: z.string().min(10, {
    //message: "The answer should be a minimum 10 characters",
  //}),
  //iquestion6: z.string().min(10, {
    //message: "The answer should be a minimum 10 characters",
  //}),
  //iquestion7: z.string().min(10, {
    //message: "The answer should be a minimum 10 characters",
  //}),
})

export default function IndividualForm() {

  const router = useRouter()

  const indvForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iquestion1: "",
      iquestion2: "",
      iquestion3: "",
      iquestion4: "",
      iquestion5: "",
      iquestion6: "",
      iquestion7: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmitForm(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Storing the submit values", values);
    localStorage.setItem('individualAnswers', JSON.stringify(values));
    router.push('/playground')
  }

  return (
    <>
    <div className="flex items-center h-full w-full text-white">
      <div className="w-1/2 bg-none rounded p-10 m-10 mr-auto ml-auto">
        <h1 className="block text-5xl w-full text-center text-white mb-12">Individual Owner Signup</h1>
        <Form {...indvForm}>
          <form onSubmit={indvForm.handleSubmit(onSubmitForm)} className="space-y-8 text-lg">
          <div className="flex flex-col mb-4">
            <FormField
              control={indvForm.control}
              name="iquestion1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xl" >Please provide a short Description of your NFT's Character:</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 placeholder-white p-6" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-4">
            <FormField
              control={indvForm.control}
              name="iquestion2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xl" >Tell us about your character's origin story. Where were they born? What was their upbringing like?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 placeholder-white p-6" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-4">
            <FormField
              control={indvForm.control}
              name="iquestion3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xl" >What drives your character? What are their goals or dreams?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 placeholder-white p-6" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col mb-4">
            <FormField
              control={indvForm.control}
              name="iquestion4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xl">Does your character have any key relationships?  Do they have a family, a lover, a nemesis?  Tell us about their social circle?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 placeholder-white p-6" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-4">
            <FormField
              control={indvForm.control}
              name="iquestion5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xl">How does your character respond in stressful situations?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 placeholder-white p-6" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-4">
            <FormField
              control={indvForm.control}
              name="iquestion6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xl">How does your character feel about meeting others?</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 placeholder-white p-6" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-4">
            <FormField
              control={indvForm.control}
              name="iquestion7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xl">Please describe any flaws of your character</FormLabel>
                  <FormControl>
                    <Input className="border py-2 px-3 placeholder-white p-6" placeholder="" {...field} />
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
