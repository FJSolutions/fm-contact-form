# Frontend Mentor - Contact form solution

This is my solution to
the [Contact form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/contact-form--G-hYlqKJj).
Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Navigate the whole form and submit it by only using the keyboard.

### Screenshots

#### Mobile view

![](./screenshot-mobile.png)

#### Desktop view (success)

![](./screenshot-success.png)

#### Desktop view (error)

![](./screenshot-errors.png)

### Links

- Solution URL: https://github.com/FJSolutions/fm-contact-form
- Live Site URL: 

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Preact](https://preactjs.com/) - JS library
- [TS-Pattern](https://github.com/gvergnaud/ts-pattern) - TypeScript pattern-matching
- [LightningCSS](https://lightningcss.dev/) - For styles
- [Zod](https://zod.dev/) - For validation
- [Sonner](https://sonner.emilkowal.ski/) - Toast

### What I learned

- Absolutely loving `prect`
- Making input components for consistent layout, classes, and accessibility 

- Find a better way to structure my CSS; it's become too spaghetti-like.

```css
[type="submit"]:hover {
  background-color: var(--grey-900);
}
```

- Challenges of using `createModel` (multiple re-renders loosing state) and just how good it is


```ts
export const ContactModel = createModel((): Contact => {
  const firstName = signal("")
  const surname = signal("")
  const email = signal("")
...
})
```

### Continued development

Save the data in a database for later use.

### AI Collaboration

I used external AIs to validate and inform my design ideas and implementations but no code generation.

## Author

- Frontend Mentor - [Francis Judge](https://www.frontendmentor.io/profile/FJSolutions)
