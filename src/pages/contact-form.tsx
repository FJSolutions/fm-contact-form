import type { TargetedEvent } from "preact";
import { createModel, type Signal, signal } from "@preact/signals";
import { ContactSchema } from "./contact-model.ts";
import { TextInput } from "../components/text-input.tsx";
import { CheckInput } from "../components/check-input.tsx";
import { formDataToObject, type FormError, type FormObject } from "./form-utils.ts";
import { z } from "zod";
import { errorMessages } from "../components/component-utils.tsx";

interface Contact {
   firstName: Signal<string>;
   surname: Signal<string>;
   email: Signal<string>;
   message: Signal<string>;
   queryType: Signal<"General Enquiry" | "Support Request" | "">
   consent: Signal<boolean>
   errors: Signal<FormError<Contact>>
   validate: (data: FormObject<Contact>) => boolean
}

// @ts-ignore
const ContactModel = createModel((): Contact => {
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

            consent.value = data.consent.value

            errors.value = res
            return false
         }

         return true
      }
   }
})

const ContactForm = () => {
   const model: Contact = new ContactModel()

   const handleSubmit = (e: TargetedEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = formDataToObject<Contact>(e.currentTarget)
      const valid = model.validate(formData)
      if (valid) {
         e.currentTarget.reset()
         alert("Success")
      }
   }
   return (
      <form onSubmit={handleSubmit} id="contact-form" autoComplete="on">
         <h1>Contact Us</h1>
         <section id="contact-names">
            <TextInput type={"text"} name={"firstName"} label={"First name"}
                       placeholder={"First name"}
                       required={true}
                       value={model.firstName} autoFocus={true}
                       errors={model.errors}>
            </TextInput>
            <TextInput type={"text"} name={"surname"} label={"Surname"} placeholder={"Surname"}
                       required={true}
                       value={model.surname}
                       errors={model.errors}/>
         </section>
         <TextInput type={"email"} name={"email"} label={"Email"}
                    placeholder={"someone@example.com"}
                    required={true}
                    value={model.email}
                    errors={model.errors}/>
         <fieldset id="queryType">
            <legend>Query Type <span>*</span></legend>
            <label for={"generalEnquiry"}>
               <input type="radio" id="generalEnquiry" name="queryType" value="General Enquiry"
                      checked={model.queryType.value === "General Enquiry"}/>
               <span>General Enquiry</span>
            </label>
            <label for="supportRequest">
               <input type="radio" id="supportRequest" name="queryType" value="Support Request"
                      checked={model.queryType.value === "Support Request"}/>
               <span>Support Request</span>
            </label>
            {/*{errorMessages(model.errors, "queryType")}*/}
         </fieldset>
         <TextInput type="textarea" name={"message"} label={"Message"} value={model.message}
                    required={true}
                    errors={model.errors}/>
         <CheckInput name={"consent"} label={"I consent to being contacted by the team"}
                     value={model.consent} required={true}
                     errors={model.errors}/>
         <input type="submit">Submit</input>
      </form>
   )
}

export {
   ContactForm
}
