import type { TargetedEvent } from "preact";
import { computed } from "@preact/signals";
import { toast } from 'sonner';
import { TextInput } from "../components/text-input.tsx";
import { CheckInput } from "../components/check-input.tsx";
import { formDataToObject } from "./form-utils.ts";
import { errorMessages } from "../components/component-utils.tsx";
import { type Contact, ContactModel } from "./contact-model.ts";

const ContactForm = () => {
   const model: Contact = new ContactModel()

   const handleSubmit = (e: TargetedEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = formDataToObject<Contact>(e.currentTarget)
      const valid = model.validate(formData)
      if (valid) {
         e.currentTarget.reset()
         toast.success("Success", {
            description: "Thanks for completing the form. We'll be in touch soon!",
            duration: 3000,
         })
      }
   }

   const queryTypeError = computed(() => errorMessages(model.errors, "queryType"))

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
         </fieldset>
         {queryTypeError}
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
