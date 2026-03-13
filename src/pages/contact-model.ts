import { z } from "zod";
import { createModel, signal, type Signal } from "@preact/signals";
import type { FormError, FormObject } from "./form-utils.ts";

const ContactSchema = z.object({
   firstName: z.string().min(1, "This field is required"),
   surname: z.string().min(1, "This field is required"),
   email: z.string().min(1, "This field is required").email({error: "Please enter a valid email address"}),
   queryType: z.string().default("").refine(v => ["General Enquiry", "Support Request"].includes(v), {message: "Please select a query type"}),
   message: z.string().min(1, "This field is required"),
   consent: z.transform(v => v === "on").refine(v => v, {message: "To submit this form, please consent to being contacted"}),
})

// export type Contact = typeof ContactSchema

export interface Contact {
   firstName: Signal<string>;
   surname: Signal<string>;
   email: Signal<string>;
   message: Signal<string>;
   queryType: Signal<"General Enquiry" | "Support Request" | "">
   consent: Signal<boolean>
   errors: Signal<FormError<Contact>>
   validate: (data: FormObject<Contact>) => boolean
}

export const ContactModel = createModel((): Contact => {
   const firstName = signal("")
   const surname = signal("")
   const email = signal("")
   const message = signal("")
   const queryType = signal<"General Enquiry" | "Support Request" | "">("")
   const consent = signal(false)
   const errors: Signal<FormError<Contact>> = signal({})

   return {
      firstName, surname, email, message, queryType, consent, errors,

      validate(data: FormObject<Contact>): boolean {
         const validation = ContactSchema.safeParse(data)
         if (!validation.success) {
            const zodErrors = z.treeifyError(validation.error)
            let res = {}
            if (zodErrors.properties) {
               const properties = zodErrors.properties as Record<string, any>
               Object.keys(properties).forEach(key => {
                  const innerProp = properties[key]["errors"]
                  Object.defineProperty(res, key, {value: innerProp})
               })
            }

            errors.value = res
            return false
         }

         firstName.value = ""
         surname.value = ""
         email.value = ""
         message.value = ""
         queryType.value = ""
         consent.value = false
         errors.value = {}
         return true
      }
   }
})

export { ContactSchema }