import { z } from "zod";

const ContactSchema = z.object({
   firstName: z.string().min(1, "This field is required"),
   surname: z.string().min(1, "This field is required"),
   email: z.string().min(1, "This field is required").email({error: "Please enter a valid email address"}),
   queryType: z.enum(["General Enquiry", "Support Request"], {error: "Please select a query type"}),
   message: z.string().min(1, "This field is required"),
   consent: z.boolean({error: "To submit this form, please consent to being contacted"}),
})

export type Contact = typeof ContactSchema

export { ContactSchema }