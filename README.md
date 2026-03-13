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

Be able to navigate the whole form and submit it by only using the keyboard and a screen reader.

### Screenshots

#### Mobile view

![](./screenshot-mobile.png)

#### Desktop view (success)

![](./screenshot-success.png)

#### Desktop view (error)

![](./screenshot-errors.png)

### Links

- Solution URL: https://github.com/FJSolutions/fm-contact-form/
- Live Site URL: https://fbj-fm-contact-form.netlify.app/

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

I am absolutely loving `prect`. I have used `react` before, especially in `next.js` and enjoyed it,
but I am seeing the reason that `preact` was created, and I'm really enjoying it.

Having said that, I decided to use `createModel` for the first time and was caught by the difference
in the render cycle between hooks and signals. I probably spent half of the time, which I did spend
on the project, on understanding and debugging this. A very worthwhile exercise, even if it was very
frustrating from time to time.

I used `zod` for validation as it seems to be the industry standard, and learned a few new things
about getting exactly the validation I wanted. I also used `ts-pattern`, a pattern-matching library
for `typescript` and will use it again &ndash I am an avid functional programming fan (`preact` and
`react` were designed with functional patterns to the fore). This library adds one of the
features that I miss most in TypeScript.

`preact` enabled me to componentise the form controls for more consistency of accessibility,
styling, and feature encapsulation. If I had spent more time on this project I would have made these
components more robust and consistent across all controls.

With the nominal increase in complexity of this mini-project I realise that I need to find a better
way to structure my CSS &ndash; it is become too spaghetti-like. Similarly, I need to look at CSS
Modules per component.

```css
[type="submit"]:hover {
  background-color: var(--grey-900);
}
```

Choosing to use `createModel` was both valuable and frustrating! I like the single source of truth
for all the state and got the basics working quickly. But what I was implementing the error handling
and feedback I got caught with a multiple re-rendering scenario where I was loosing state because of
multiple renders. However, when I realised what was going on I also quickly realise the necessary
solution (using a `computed` function). The net result: I'm loving `preact` even though there is a
lot more to learn.

```ts
export const ContactModel = createModel((): Contact => {
   const firstName = signal("")
   const surname = signal("")
   const email = signal("")
...
})
```

The above snippet creates a constructor function! Even seeing this pattern tickles my functional
funny-bone. Because it is a HOF (higher order function) being used in an OO (Object-Oriented) way!

### Continued development

Save the data in a database for later use and send an acknowledgement email before redirecting the
user to and FAQ page.

### AI Collaboration

I used external AIs to validate and inform my design ideas and implementations but no code
generation.

## Author

- Frontend Mentor - [Francis Judge](https://www.frontendmentor.io/profile/FJSolutions)
