import { match, P } from "ts-pattern";
import { Fragment } from "preact";
import type { Signal } from "@preact/signals";

export const errorMessages = (errors: Signal<Record<string, string[] | string | undefined>> | undefined, name: string) => {

   if (errors && errors.value) {
      return match(errors?.value[name])
         .with(P.nullish, () => (<Fragment/>))
         .with(P.string, (error) => (<p className="input-errors">{error}</p>))
         .with(P.array(P.string), (errors) => (<p className="input-errors">{errors[0]}</p>))
         // .with(P.array(P.string), (v) => v.length === 1, (error) => (
         //    <p className="input-errors">{error}</p>))
         // .with(P.array(P.string), (errors) => (
         //    <ul>{errors.map((error) => <li className="input-errors"
         //                                   key={error}>{error}</li>)}</ul>))
         .exhaustive()
   } else {
      console.log(name, errors?.value);

      return <Fragment/>;
   }
}
