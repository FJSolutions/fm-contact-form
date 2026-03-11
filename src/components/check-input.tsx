import type { PropsWithChildren } from "preact/compat";
import type { Signal } from "@preact/signals";
import { match, P } from "ts-pattern";
import { Fragment } from "preact";

export interface CheckInputProps extends PropsWithChildren {
  name: string
  label: string
  required?: boolean
  value: Signal
  description?: string
  errors?: string[] | string
}

const CheckInput = (props: CheckInputProps) => {
  const inputName = `${props.name}`

  const descriptionComponent = props.description ? <div className="input-description">
    {props.description}
  </div> : Fragment;

  const errorsComponent =
    match(props.errors)
      .with(P.nullish, () => (<Fragment/>))
      .with(P.string, (error) => (<p className="input-errors">{error}</p>))
      .with(P.array(P.string), (errors) => (
        <ul>{errors.map((error) => <li className="input-errors" key={error}>{error}</li>)}</ul>))
      .exhaustive()

  return (
    <div class="input-field">
      <label for={inputName}>
        <input
          type="checkbox"
          name={inputName}
          id={inputName}
          aria-required={props.required}
          checked={props.value}/>
        {props.label} {props.required && <span>*</span>}
      </label>
      {descriptionComponent}
      {errorsComponent}
    </div>)
}

export { CheckInput }
