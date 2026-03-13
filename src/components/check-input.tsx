import type { PropsWithChildren } from "preact/compat";
import type { Signal } from "@preact/signals";
import { type TargetedEvent } from "preact";
import { FormField } from "./form-field.tsx";

export interface CheckInputProps extends PropsWithChildren {
   name: string
   label: string
   required?: boolean
   value: Signal
   description?: string
   errors?: Signal<Record<string, string[] | string | undefined>>
}

const CheckInput = (props: CheckInputProps) => {
   const inputName = `${props.name}`

   const handleCheckChange = (e: TargetedEvent<HTMLInputElement>) => {
      props.value.value = e.currentTarget.checked
   }

   return (
      <FormField name={props.name} errors={props.errors} description={props.description}>
         <label for={inputName}>
            <input
               type="checkbox"
               value="on"
               name={inputName}
               id={inputName}
               aria-required={props.required}
               checked={props.value}
               onChange={handleCheckChange}/>
            {props.label} {props.required && <span>*</span>}
         </label>
      </FormField>
   )
}

export { CheckInput }
