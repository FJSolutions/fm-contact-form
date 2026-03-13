import type { Signal } from "@preact/signals";
import { Fragment } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { errorMessages } from "./component-utils.tsx";

export interface FormFieldProps extends PropsWithChildren {
   name: string
   description?: string
   errors?: Signal<Record<string, string[] | string | undefined>>
}

export const FormField = (props: FormFieldProps) => {

   const descriptionComponent = props.description ? <div className="input-description">
      {props.description}
   </div> : Fragment;

   const errorComponent = errorMessages(props.errors, props.name)

   return (
      <div className="input-field" aria-live="polite">
         <slot>
            {props.children}
         </slot>
         {descriptionComponent}
         {errorComponent}
      </div>
   )
}
