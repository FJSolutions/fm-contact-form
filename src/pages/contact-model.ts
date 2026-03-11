import { z } from "zod";

const ContactSchema = z.object({
  firstName: z.string({error: "This field is required"}),
  lastName: z.string({error: "This field is required"}),
  email: z.string({error: "This field is required"}).email({error: "Please enter a valid email address"}),
  queryType: z.enum(["General Enquiry", "Support Request"], {error: "This field is required"}),
  message: z.string({error: "This field is required"}),
})

export type Contact = typeof ContactSchema

export { ContactSchema }