
export type FormObject<T> = {
   [K in keyof T]: any
};

export type FormError<T> = {
   [K in keyof T]?: string | string[] | undefined
}

export const formDataToObject = <T>(form: HTMLFormElement): FormObject<T> => {
   const formData = new FormData(form)
   const objData = Object.fromEntries(formData)
   return objData as unknown as FormObject<T>
}
