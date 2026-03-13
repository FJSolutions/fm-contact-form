import type { PropsWithChildren } from "preact/compat";
import type { Signal } from "@preact/signals";
import { Fragment, type TargetedEvent } from "preact";
import { errorMessages } from "./component-utils.tsx";

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

   const descriptionComponent = props.description ? <div className="input-description">
      {props.description}
   </div> : Fragment;

   const errorComponent = errorMessages(props.errors, props.name)

   const handleCheckChange = (e: TargetedEvent<HTMLInputElement>) => {
      props.value.value = e.currentTarget.checked
   }

   return (
      <div class="input-field">
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
         {descriptionComponent}
         {errorComponent}
      </div>)
}

export { CheckInput }
