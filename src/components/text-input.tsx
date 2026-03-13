import type { Signal } from "@preact/signals"
import { type PropsWithChildren } from "preact/compat";
import { Fragment, type TargetedEvent } from "preact";
import { match, P } from "ts-pattern";
import { FormField } from "./form-field.tsx";

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

   const handleTextChange = (event: TargetedEvent<HTMLInputElement> | TargetedEvent<HTMLTextAreaElement>) => {
      const val = event.currentTarget.value
      if (props.value.value !== val) {
         props.value.value = val
      }
   }

   let inputComponent =
      match(props.type)
         .with("text", () => (
            <input
               type="text"
               class={props.errors?.value[props.name] && `input-error`}
               name={inputName}
               id={inputName}
               aria-required={props.required}
               aria-describedby={props.description ? `${inputName}-description` : undefined}
               value={props.value.value}
               placeholder={props.placeholder}
               autoFocus={props.autoFocus}
               onChange={handleTextChange}
               onKeyPress={handleTextChange}/>))
         .with("email", () => (
            <input
               type="email"
               class={props.errors?.value[props.name] && `input-error`}
               name={inputName}
               id={inputName}
               aria-required={props.required}
               aria-describedby={props.description ? `${inputName}-description` : undefined}
               value={props.value.value}
               placeholder={props.placeholder}
               autoFocus={props.autoFocus}
               onChange={handleTextChange}
               onKeyPress={handleTextChange}/>))
         .with("textarea", () => (
            <textarea
               rows={5}
               class={props.errors?.value[props.name] && `input-error`}
               name={inputName}
               id={inputName}
               aria-required={props.required}
               aria-describedby={props.description ? `${inputName}-description` : undefined}
               value={props.value.value}
               placeholder={props.placeholder}
               autoFocus={props.autoFocus}
               onChange={handleTextChange}
               onKeyPress={handleTextChange}></textarea>))
         .with(P.nullish, () => (<Fragment/>))
         .exhaustive()

   return (
      <FormField name={props.name} errors={props.errors} description={props.description}>
         <label for={inputName}>
            {props.label} {props.required && <span>*</span>}
         </label>
         {inputComponent}
      </FormField>
   )
}

export { TextInput };
