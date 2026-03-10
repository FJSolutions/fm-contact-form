import type { Signal } from "@preact/signals"
import type { PropsWithChildren } from "preact/compat";
import { Fragment } from "preact";

export interface TextInputProps extends PropsWithChildren {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  value: Signal<string>
  type: "text" | "email" | "textarea" | "checkbox"
  autoFocus?: boolean
  description?: string
  errors?: string[] | string
}

const TextInput = (props: TextInputProps) => {
  const inputName = `${props.name}`

  const descriptionComponent = props.description ? <div className="input-description">
    {props.description}
  </div> : Fragment;

  let errorsComponent;
  if (Array.isArray(props.value)) {
    errorsComponent = (<ul>
      {props.value.map((v) => (<li>{v}</li>))}
    </ul>)
  } else if (typeof props.errors === 'string') {
    errorsComponent = <p class="input-errors">{props.errors}</p>
  } else {
    errorsComponent = <Fragment/>
  }

  //! Checkbox

  return (
    <div class="input-field">
      <label for={inputName}>{props.label} {props.required && <span>*</span>}</label>
      {props.type === "textarea" ? (
        <textarea name={inputName} id={inputName} required={props.required} rows={14}
                  placeholder={props.placeholder}>{props.value.value}</textarea>) : (
        <input type={props.type} name={inputName} id={inputName} required={props.required}
               value={props.value.value} placeholder={props.placeholder}
               autoFocus={props.autoFocus}/>
      )}
      {descriptionComponent}
      {errorsComponent}
    </div>
  )
}

export { TextInput };
