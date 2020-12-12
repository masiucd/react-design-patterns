# Epic React ⚛️ƛ🚀⭐️

## Table of Contents

- [about](#about)
- [getting Started](#getting_started)
- [react Without JSX](#without_jsx)
- [jsx under the hood](#jsx_under_the_hood)
- [forms](#forms)
- [key prop](#key_prop)
- [useState](#useState)
- [useEffect](#useEffect)
- [hooksFlow](#hooks_flow)

## About <a name = "about"></a>

Learn `React` from basics to advanced concepts within React.
All from how React works and to using new React api like `concurrent mode`, `basics hooks` and `advanced hooks`.
This Repo will explain some of this and hopefully you could get a aha feeling from some of this content and apply it in your daily work ore just get a better grasp of the `React` fundamentals.
Thanks to [Kent C Dodds](https://github.com/kentcdodds) for the [Epic React Course](https://epicreact.dev/) where I really learned a lot and want to share all the great new things I learned.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

## Getting Started <a name = "getting_started"></a>

### How to create React elements without JSX <a name = "without_jsx"></a>

React is javascript so basically under the hood, `React` manipulate the `DOM` similar like you are probably used to with the regular `DOM`.
Difference is the React using the virtual DOM to gain as much performance as possible.
We will dig deeper in how the virtual dom works later.
But for now just a simple example how you could write React code without using jsx.

_How JSX looks under the hood, how to create a `div` container with some children_

```jsx
const rootElement = document.getElementById("root")

const element = React.createElement("div", {
  className: "container",
  children: [
    React.createElement("span", null, "Legia"),
    " ",
    React.createElement("span", null, "Warszawa!"),
  ],
})

ReactDOM.render(element, rootElement)
```

### How Jsx works under the hood <a name = "jsx_under_the_hood"></a>

```jsx
const jsxElement = <h1 id="team-legia">Legia</h1>

// ↓ ↓ ↓ ↓ compiles to ↓ ↓ ↓ ↓
const ui = React.createElement("h1", { id: "team-legia", children: "Legia" })
```

A React component is just a regular js function,so decalring a simple component like,

```jsx
function greeting(props) {
  return <div className="greeting-wrapper">{props.children}</div>
}
```

you would basically call your function component when you want to use it, like this.

```jsx
const element = (
  <div className="container">
    {React.createElement(greeting, { children: "Hello World" })}
    {React.createElement(greeting, { children: "Goodbye World" })}
  </div>
)

ReactDOM.render(element, document.getElementById("root"))
```

That's when tha capitalize version of naming our components comes in. When we name or component with a uppercase letter instead of a lowercase we tell React that this is a component
and should be used like the example above, but instead of using React.createElement we simple insert the component name in out jsx and pass any optional props to it.
What gets wrapped around the `Greeting` component will be the children that we uses as a prop in the `Greeting` component

The Greeting that take in hello is how you would prefer to use React with JSX, the second version is how actually React works under the hood, and if you use `Babel` as a compiler it will compile your JSX to the second example.

```jsx
function Element() {
  return (
    <div>
      <Greeting>
        <span>Hello</span>
      </Greeting>
      {React.createElement(Greeting, { children: "World" })}
    </div>
  )
}
```

### React forms <a name = "forms"></a>

In React,There is not so much you have to learn in React to interest with forms, comparing to how you are use to in vanilla javascript.
You will attach a submit event on the form element that takes a onSubmit prop.
This will be called with a regular submit event, from the event it self you can access all it children through `event.target.elements[index].value`.
This in not how you would prefer to do in react but it is possible and it works.

The most common way is to use controlled inputs, you also have the option to use the uncontrolled inputs, with refs.

Sometimes you have form inputs which you want to have control over.
Maybe you want to set their value as soon when the user submits a button element, or maybe you want change the the value as soon the user is typing.
This is why React supports Controlled Form inputs.

When using uncontrolled inputs like `refs` for example, you will only get the final value from your inputs while you submit the form.

Example how we use a username form with controlled inputs.

```jsx
import * as React from "react"

function UsernameForm({ onSubmitUsername }) {
  const [username, setUsername] = React.useState("")
  const [error, setError] = React.useState(false)

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleChange = e => {
    const { value } = e.target
    const isLowerCaseUsername = value === value.toLowerCase()
    setError(!isLowerCaseUsername && true)
    setUsername(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>

        <input id="username" type="text" onChange={handleChange} value={username} name="username" />
      </div>
      {error && (
        <div className="error" style={{ color: "red", backgroundColor: "#333" }}>
          username can not contain uppercase letters
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  )
}
```

### React key prop <a name = "key_prop"></a>

Keys help React identify which items have changed, are added, or are removed from the list.
Keys should be given to the elements inside the array to give the elements a stable identity, it is not recommended do use the index as the key prop to keep track on the element.
**Why?**

- A key cannot be identical to that of a sibling component.
- A key should not ever change between renders.

The key should never change, for example if you hade a list with items and each item used the index as its key (_don't use the index as the key!!!_)
you could pretty fast spot on some problems, everything works for now but what happened if you remove a existing item from the list. The index value will also change and `React` will lose to keep track on what item it should observe. Never use the key or any dynamic key that would change.
