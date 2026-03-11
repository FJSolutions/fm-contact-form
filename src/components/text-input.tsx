import type { Signal } from "@preact/signals"
import type { PropsWithChildren } from "preact/compat";
import { Fragment } from "preact";
import { match, P } from "ts-pattern";

export interface TextInputProps extends PropsWithChildren {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  value: Signal
  type: "text" | "email" | "textarea"
  autoFocus?: boolean
  description?: string
  errors?: string[] | string
}

const TextInput = (props: TextInputProps) => {
  const inputName = `${props.name}`

  const descriptionComponent = props.description ?
    <div id={`${inputName}-description`} className="input-description">
      {props.description}
    </div> : Fragment;

  let errorsComponent =
    match(props.errors)
      .with(P.nullish, () => (<Fragment/>))
      .with(P.string, (error) => (<p className="input-errors">{error}</p>))
      .with(P.array(P.string), (errors) => (
        <ul>{errors.map((error) => <li className="input-errors" key={error}>{error}</li>)}</ul>))
      .exhaustive()

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
      {errorsComponent}
    </div>
  )
}

export { TextInput };
