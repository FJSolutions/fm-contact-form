import type { Signal } from "@preact/signals"
import { type PropsWithChildren } from "preact/compat";
import { Fragment } from "preact";
import { match, P } from "ts-pattern";
import { errorMessages } from "./component-utils.tsx";

export interface TextInputProps extends PropsWithChildren {
   name: string
   label: string
   placeholder?: string
   required?: boolean
   value: Signal
   type: "text" | "email" | "textarea"
   autoFocus?: boolean
   description?: string
   errors?: Signal<Record<string, string[] | string | undefined>>
}

const TextInput = (props: TextInputProps) => {
   const inputName = `${props.name}`

   const descriptionComponent = props.description ?
      <div id={`${inputName}-description`} className="input-description">
         {props.description}
      </div> : Fragment;

   const errorComponent = errorMessages(props.errors, props.name)

   let inputComponent =
      match(props.type)
         .with("text", () => (
            <input
               type="text"
               name={inputName}
               id={inputName}
               aria-required={props.required}
               aria-describedby={props.description ? `${inputName}-description` : undefined}
               value={props.value.value}
               placeholder={props.placeholder}
               autoFocus={props.autoFocus}/>))
         .with("email", () => (
            <input
               type="email"
               name={inputName}
               id={inputName}
               aria-required={props.required}
               aria-describedby={props.description ? `${inputName}-description` : undefined}
               value={props.value.value}
               placeholder={props.placeholder}
               autoFocus={props.autoFocus}/>))
         .with("textarea", () => (
            <textarea
               name={inputName}
               id={inputName}
               aria-required={props.required}
               aria-describedby={props.description ? `${inputName}-description` : undefined}
               value={props.value.value}
               placeholder={props.placeholder}
               autoFocus={props.autoFocus}></textarea>))
         .with(P.nullish, () => (<Fragment/>))
         .exhaustive()

   return (
      <div class="input-field">
         <label for={inputName}>
            {props.label} {props.required && <span>*</span>}
            {inputComponent}
         </label>
         {descriptionComponent}
         {errorComponent}
      </div>
   )
}

export { TextInput };
