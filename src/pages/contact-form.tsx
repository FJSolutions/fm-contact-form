import type { TargetedEvent } from "preact";
import { TextInput } from "../components/text-input.tsx";
import { signal } from "@preact/signals";

const ContactForm = () => {
  const handleSubmit = (e: TargetedEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    console.log(formData)
  }

  const firstName = signal("")
  const surname = signal("")
  const email = signal("")
  const message = signal("")
  const queryType = signal("")


  return (
    <form onSubmit={handleSubmit} id="contact-form" autoComplete="on">
      <h1>Contact Us</h1>
      <section id="contact-names">
        <TextInput type={"text"} name={"firstName"} label={"First name"} placeholder={"First name"}
                   required={true}
                   value={firstName} autoFocus={true}
                   description="Your first name"
                   errors="An error!">
        </TextInput>
        <TextInput type={"text"} name={"surname"} label={"Surname"} placeholder={"Surname"}
                   required={true}
                   value={surname}/>
      </section>
      <TextInput type={"email"} name={"email"} label={"Email"} placeholder={"someone@example.com"}
                 required={true}
                 value={email}/>
      <fieldset id="queryType">
        <legend>Query Type <span>*</span></legend>
        <label for={"generalEnquiry"}>
          <input type="radio" id="generalEnquiry" name="queryType" value="General Enquiry"
                 checked={queryType.value === "General Enquiry"}/>
          <span>General Enquiry</span>
        </label>
        <label for="supportRequest">
          <input type="radio" id="supportRequest" name="queryType" value="Support Request"
                 checked={queryType.value === "Support Request"}/>
          <span>Support Request</span>
        </label>
      </fieldset>
      <TextInput type="textarea" name={"message"} label={"Message"} value={message}
                 required={true}/>
      <label for="consent">
        <input type="checkbox" id="consent" name="consent"/>
        <span>I consent to being contacted by the team</span>
      </label>
      <input type="submit">Submit</input>
    </form>
  )
}

export {
  ContactForm
}
