# Reactive design/concepts ⚛️ƛ🚀⭐️

## Table of Contents

- [about](#about)
- [getting Started](#getting_started)
- [react Without JSX](#without_jsx)
- [jsx under the hood](#jsx_under_the_hood)
- [forms](#forms)
- [key prop](#key_prop)
- [useState](#useState)
- [useEffect](#useEffect)
- [useRef](#useRef)
- [custom hooks](#custom_hooks)
- [lift state](#lift_state)
- [tic-tac-toe](#tic-tac-toe)
- [error boundary](#error-boundary)
- [useReducer](#use-reducer)
- [useCallback](#use-cb)
- [useImperativeHandle](#imperative-handler)
- [react design patterns](#react-design-patterns)
  - [compound components](#compound-components)
  - [prop getters](#prop-getters)
  - [state reducers](#state-reducer)
- [component composition](#component-composition)
- [testing](#testing)
  - [implementation detail](#implementation-details)
  - [testing hooks](#testing-hooks)
- [performance](#performance)
  - [code splitting](#code-splitting)
  - [memoization](#memo)
  - [react context performance](#react-context-performance)
  - [suspense](#suspense)

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

### state <a name = "useState"></a>

`React.useState` is a function that accepts a single argument.
The argument you pass in will be the initialState for the instance of the components, in a simple counter example you want to start count from zero so our initial state would be zero

```jsx
const Counter = () => {
  const [count, setCount] = React.useState(0) // initialState

  return (
    <div>
      <button onClick={() => setCount(p => p + 1)}>+</button>
      <strong>{count}</strong>
      <button onClick={() => setCount(p => p - 1)}>-</button>
    </div>
  )
}
```

React state will update our component as soon we update our state. It works like a observer the wait for the state to update `using setCount` in this case.
As soon we click one of the buttons the counter should increase/decrease and the component would be updated.

### useEffect <a name = "useEffect"></a>

Every application would need some kind of side effect to make the application interactive.
The `useEffect` hook is just what we use in react to trigger some kind of side effect in our component.
after React renders (and re-renders) your component to the DOM.
It accepts a callback function which React will call after the DOM has been updated.

```jsx
React.useEffect(() => {
  // code goes in here
})
```

Let's show a example of how we can store something in local-storage and only re-render our component as soon something change.

```jsx
function Greeting({ initialName = "" }) {
  const [name, setName] = React.useState(() => localStorage.getItem("name") || initialName)

  React.useEffect(() => {
    localStorage.setItem("name", name)
  }, [name])

  const handleChange = event => {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  )
}
```

Why I using a function as my initialValue?
It's a technique that React accepts that will make a lazy load, reading from local-storage can be slow and we don't want to read from local-storage if our initialValue has not been changed.
This is a great way to optimize your application a bit.

HTTP requests are another common side-effect that we need to do in applications. We expect to get som kind of data as soon our component has been rendered to the screen.
If you want to call a async function inside your `useEffect` there is some thing you should know.

#### This in not allowed

```jsx
useEffect(async () => {
  const res = await doSomeStuff()
}, [])
```

The reason this doesn’t work is because when you make a function async, it
will automatically returns a promise.
So if you want to use async/await, the best way to do that is like this:

```jsx
React.useEffect(() => {
  async function foo() {
    const result = await doSomeStuff()
    // do something if we got something
  }
  foo()
})
```

### useRef <a name = "useRef"></a>

useRef is a great alternative if anytime you need to keep reference to something, like a DOM node, and you want to be able to make some changes to that reference `without trigger a re-render`, of you need the component to re-render the `useState` would be a better option.
the ref that you will create will b have the current value ass soon the component gets mounted to the DOM.

```jsx
const Foo = () => {
  const ref = React.createRef(null) //here ref will be undefined

  // When out component has been mounted
  // we now have access to the ref
  React.useEffect(() => {
    const refValue = ref.current
    console.log(refValue) // <div className="foo-bar"> <div><p>hello</p></div> </div>
  }, [])

  return (
    <div ref={ref}>
      <div className="foo-bar">
        <p>hello</p>
      </div>
    </div>
  )
}
```

### customHooks <a name = "custom_hooks"></a>

`usePrevious` hook the get the reference from the previous value

```tsx
function usePrevious<T>(value: T = "") {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}
```

A advanced version of a custom `useLocalStorage hook`, great example by [Kent C Dodds](https://github.com/kentcdodds) showing how this could been done in [Epic React Course](https://epicreact.dev/):

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [value, setValue] = React.useState(() => {
    const valueInLocalStorage = localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof initialValue === "function" ? initialValue() : initialValue
  })

  const prevRefKey = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevRefKey.current
    if (prevKey !== key) {
      localStorage.removeItem(prevKey)
    }
    prevRefKey.current = key
    localStorage.setItem(key, serialize(value))
  }, [value, key, serialize])

  return { value, setValue }
}

function Greeting({ initialName = "" }) {
  const { value: name, setValue: setName } = useLocalStorage("name", initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  )
}
```

### lifting state <a name = "lift_state"></a>

Lifting state is a common React interview question where we simply do as it sounds like. We lift our state that are lower in the tree and lifting up to the least common parent. If you want to read more about `lifting state` I highly recommend [react-docs](https://reactjs.org/docs/lifting-state-up.html).

Take this for example:
We drilling down our props that we can share our state both in `Name component` `Display component`, and `MyTeam component`.
Imagine if we would have local state in all of the child components, it would not completely sync with the rest of the components.

Another important concept is to `colocate` tou react application.
`Colocate` means that you actually check if the state in that is higher up in the tree is actually used in other child components. If not then we should remove that state that are higher up in the tree to only be used in the component where it is only used. In this case it is the `Name component`. No we would only re-render the name component when the state updates, i small performance gain here 💪.

```jsx
import * as React from "react"

function Name() {
  const [name, setName] = React.useState("")
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

function MyTeam({ team, onTeamChange }) {
  return (
    <div>
      <label htmlFor="team">My team: </label>
      <input id="team" value={team} onChange={onTeamChange} />
    </div>
  )
}

function Display({ team }) {
  return <div>{`your favorite team is: ${team}!`}</div>
}

function App() {
  const [team, setAnimal] = React.useState("")

  const onTeamChange = event => {
    setAnimal(event.target.value)
  }
  return (
    <form>
      <Name />
      <MyTeam team={team} onTeamChange={onTeamChange} />

      <Display team={team} />
    </form>
  )
}

export default App
```

### Tic tac toe game with React hooks <a name = "tic-tac-toe"></a>

```jsx
import * as React from "react"

function useLocalStorage(key, defaultValue = []) {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  )

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Board() {
  const [squares, setSquares] = useLocalStorage(Array(9).fill(null))
  const [isX, setIsX] = React.useState(true)
  const [status, setStatus] = React.useState("")

  function selectSquare(square) {
    const squareCopy = [...squares]
    if (calculateWinner(squareCopy) || squareCopy[square]) {
      return
    }
    squareCopy[square] = isX ? "X" : "O"
    setSquares(squareCopy)
    setIsX(p => !p)
    if (calculateWinner(squareCopy)) {
      setStatus(`Winner is ${calculateWinner(squareCopy)}`)
    }
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
```

### Error boundary <a name = "error-boundary"></a>

Error boundaries is a component that we can wrap around our child components around to catch possible errors and for example display those error instead of the application totally get crashed.

`From React docs`

> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

So basically if we catch a error the we will display:

```jsx
<h1>Something went wrong </h1>
```

else just render the children.

```jsx
<ErrorBoundary>
  <CompA />
  <CompB />
</ErrorBoundary>
```

You can see the `ErrorBouldery` as a giant try _catch around_ your components

One last little thing, by passing the `ErrorBoundary` a key prop it will re-render the `ErrorBoundary` component should you as a user could try another try, otherwise the `ErrorBoundary` component will still be mounted on to the page becasue we hav enot trigger any re-render if the props has been changed.

### useReducer hook <a name = "use-reducer"></a>

Sometimes you would need something more advanced then the regular setState hook, if you want to separate the state logic from the components that updates the state, `useReducer` is a very handy hook to use.
If you are used to old day `Redux` then the `useReducer` hook works very similar.

Here is a example of a simple counter using the reducer:

```jsx
const initialState = {
  count: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      }
    case "decrement":
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      throw new Error(`action.type ${action.type} is not supported!💣`)
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <>
      <button onClick={() => dispatch({ type: "increment" })}>{state.count}</button>
      <button onClick={() => dispatch({ type: "decrement" })}>{state.count}</button>
    </>
  )
}
```

### UseCallback <a name = "use-cb"></a>

Sometimes you need to pass a function as a prop and perhaps you are using a useEffect inside the child component where you receive the function the you get as a prop.
The useEffect is depending on the function if it should re-render or not, but we defined the function in the parent body so we will get a new value every time we re-render so basically we should get a infinitive loop here. To the rescue, `useCallback` if we would wrap out function that we pass down in a useCallback hook the function will only be updated if the prop that it receive changes. This is really hard to explain but let's show a code snippet.
This is some code inspiration when [Kent C Dodds](https://github.com/kentcdodds) from the [Epic React Course](https://epicreact.dev/) shows how this would work.

```jsx
import * as React from "react"

import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from "../pokemon"

const asyncReducer = (state, action) => {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null }
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null }
    }
    case "rejected": {
      return { status: "rejected", data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const useAsync = (asyncCallback, initialState) => {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: "idle",
    pokemon: null,
    error: null,
    ...initialState,
  })

  React.useEffect(() => {
    const promise = asyncCallback()
    if (!promise) {
      return
    }

    dispatch({ type: "pending" })
    promise.then(
      data => {
        dispatch({ type: "resolved", data })
      },
      error => {
        dispatch({ type: "rejected", error })
      }
    )
  }, [asyncCallback])
  return state
}

function PokemonInfo({ pokemonName }) {
  const cbFn = React.useCallback(() => {
    // we wrap the function in a useCallback to use it later as a decency in the useAsync hook
    if (!pokemonName) {
      return
    }
    return fetchPokemon(pokemonName)
  }, [pokemonName])

  const state = useAsync(cbFn, { status: pokemonName ? "pending" : "idle" }, [pokemonName])

  const { data: pokemon, status, error } = state

  if (status === "idle" || !pokemonName) {
    return "Submit a pokemon"
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === "rejected") {
    throw error
  } else if (status === "resolved") {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error("This should be impossible")
}
```

## useImperativeHandler <a name = "imperative-handler"></a>

useImperativeHandler hook is nothing you should use frequently ore really aim for. If you using it you should always think if there is another solution to this problem.
We should minimize imperative program as much as possible to make our code more readable and follow the way `React` want us to write our code.

But let's say that you want to send down a `ref` to a child component and from there trigger some functions that we then want to acces from the parent component. This works similar like the imperative way of getting DOM elements like using, `document.querySelector` ore `document.getElementById`.
With declaring `useImperativeHandler` we then have access via the ref in the parent component with our 2 `scrollToTop` and `scrollToBottom`.

```jsx
import * as React from "react"

const MessagesDisplay = React.forwardRef(function (props, ref) {
  const { messages } = props

  const containerRef = React.useRef()
  React.useLayoutEffect(() => {
    scrollToBottom()
  })

  function scrollToTop() {
    containerRef.current.scrollTop = 0
  }
  function scrollToBottom() {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }

  React.useImperativeHandle(ref, () => ({
    scrollToTop,
    scrollToBottom,
  }))

  return (
    <div ref={containerRef} role="log">
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  )
})

function App() {
  const messageDisplayRef = React.useRef()
  const [messages, setMessages] = React.useState(allMessages.slice(0, 8))
  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null
  const removeMessage = () =>
    messages.length > 0 ? setMessages(allMessages.slice(0, messages.length - 1)) : null

  const foo = () => {
    console.log("foooo")
  }
  const scrollToTop = () => messageDisplayRef.current.scrollToTop()
  const scrollToBottom = () => {
    messageDisplayRef.current.scrollToBottom()
  }

  return (
    <div className="messaging-app">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={addMessage}>add message</button>
        <button onClick={removeMessage}>remove message</button>
      </div>
      <hr />
      <div>
        <button onClick={scrollToTop}>scroll to top</button>
      </div>
      <MessagesDisplay ref={messageDisplayRef} messages={messages} />
      <div>
        <button onClick={scrollToBottom}>scroll to bottom</button>
      </div>
    </div>
  )
}

export default App
```

## React Design Patterns <a name = "react-design-patterns" ></a>

### Compound Components <a name = "compound-components" ></a>

Compound components are components there are really powerful together but pretty useless by them own. Take for example a `<select>` and a `<option>` tag.
By the own they don't fill any special meaning but together we would get a dropdown with different options that our user can pick and choose.

```jsx
<select>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</select>
```

So with a compound component we create a component that is very flexible and works with different kind of options, It can be data like props ore other components for example:

```jsx
<Select
  options={[
    { value: "A", display: "Option A" },
    { value: "B", display: "Option B" },
    { value: "C", display: "Option C" },
  ]}
/>
```

### Prop Getters <a name = "prop-getters" ></a>

Prop Getters is a way for us to compose different behavers,like event into our components without overriding the current event.
If you worked with [react table](https://github.com/tannerlinsley/react-table) before then you probably used `prop getters`.
Take this code example from [Kent C Dodds, Epic React course](https://github.com/kentcdodds)
The reason why we use the `handleTogglerProps` function is that we can compose different functions without overriding the first event.
Let's say you would write any library for some kind of toggle switch, the company that uses your library need a addition of a onClick event but want to keep the current event without overriding it. Thats what `handleTogglerProps` solves in this case.

```jsx
import * as React from "react"
import { Switch } from "../switch"

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const handleTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }
  return { on, handleTogglerProps }
}

function App() {
  const { on, handleTogglerProps } = useToggle()
  return (
    <div>
      <Switch {...handleTogglerProps({ on })} />
      <hr />
      <button
        aria-label="custom-button"
        {...handleTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.info("onButtonClick"),
          id: "custom-button-id",
        })}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  )
}

export default App
```

### State reducer <a name = "state-reducer" ></a>

Same mental model as using `props getters` what we want to do is to give s option for how the user will get a lot of flexibility to change the current behavior if it will not suit them well.
Think of another library you building and you ship some really cool functionality with a already set up state reducer where the developer only have to dispatch the actions on where it is needed.
But sometimes the user would need to change the reducer because it is not what the developer would need for a expected moment. I highly recommend to read [state reducer pattern](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks) by `Kent C Dodds`.

### Component composition <a name = "component-composition"></a>

I think to get a grasp of how `component composition` really works it is a good idea to start with knowing the difference of `inheritance` vs `composition`.
If you been in some kind of technical school, like a computer science program or any boot-camp you possibly have been heard of this term before.
Simply said, `inheritance` is when design your types on what they are while `composition` is when you design your types around what they do.

Basically every react component is a function that's just wait until it gets called, just like when can compose different function into a given,expected result, same goes for out react components.
imagine that we have a wrapper component that could look a little bit different depending on where we needs it in out application.
I will not have some much logic but still very important to et the expected behavior for the components that it wraps around, and this children components can be any children components, you probably thinking right about a very special prop with in react, and yes that is `props.children`.
It is a very underestimated prop that don't get to much creed but is such a powerful prop with in react.
Thanks to `props.children` we get power to use composition, `component composition`.

```jsx
const Wrapper = props => {
  return <div className={cx(wrapperStyles, props.className)}>{props.children}</div>
}

import Wrapper from "@components/Wrapper"
import ComA from "@components/CompA"
import CompB from "@components/CompB"
import CompC from "@components/CompC"

const SomeComponent = () => {
  return (
    <Wrapper>
      <CompA />
      <CompB />
      <CompC />
    </Wrapper>
  )
}
```

When can compose what ever components we need thanks to `props.children`, this how `component composition` works in react and thats is why it is so powerful to use over inheritance.This is not a topic of what is better ore worse, but in my opinion I prefer to use composition over inheritance just of how we can cherry pick on what we what and are not depended on out parent class like in inheritance.
The react team itself says that they use composition over inheritance due to the power of customization and flexibility.

### Testing <a name = "testing"></a>

Testing is a very important topic that boost our confidence that when we ship our code into production we can be more confident that it should work as expected.
There are of course bad written tests and better written tests. There are some topics and steps that I think you should follow when testing your react components.

```jsx
import * as React from "react"
import { render, screen } from "@testing-library/react"
import Counter from "../../components/counter"
import userEvent from "@testing-library/user-event"

test("counter increments and decrements when the buttons are clicked", () => {
  render(<Counter />)

  const decrement = screen.getByRole("button", { name: "Decrement" })
  const increment = screen.getByRole("button", { name: "Increment" })
  const message = screen.getByText(/Current count: 0/i)

  expect(message).toHaveTextContent("Current count: 0")
  userEvent.click(increment)
  expect(message).toHaveTextContent("Current count: 1")

  userEvent.click(decrement)
  expect(message).toHaveTextContent("Current count: 0")
})
```

### Implementation details <a name = "implementation-details"></a>

When we test our react components we should think as being the user, how should the user use this application, what should they do and expect.
The user does not care if we are using a functional component a class component, if we written out utils functions using pure functions, in the end the only thing that's matter is that the user just want a good user experience,`UX` and have some kind of purpose when they visit our app.
So by testing we should not think of the details from a developer perspective by rather from the user perspective

a good check to see if you have written your tests with an `implementation details` thought is if you change some of your components and a lot of them starting to fail for some reason, perhaps you getting the button by using:

```jsx
document.querySelector("button")[0]
```

what happens if we add another button, then the index would be changed as well.
A much better approach would be to use something like:

```jsx
screen.getByRole("button", { name: "your-button-name" })
```

Example of how we can test a form component with a util function that will generate random name and password for our fields and still work

```jsx
import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login from "../../components/login"

const fakerFn = () => {
  const names = () => {
    return ["bob", "frank", "sally", "mike", "tina"]
  }
  const passwords = () => {
    return ["123456", "sdsa@121!", "2ddcmov1##12%$lol", "helloWorld"]
  }
  const random = xs => {
    return xs[Math.floor(Math.random() * xs.length)]
  }

  const fakePassword = () => {
    const items = passwords()
    return random(items)
  }
  const fakeUserName = () => {
    const items = names()
    return random(items)
  }

  return {
    fakePassword,
    fakeUserName,
  }
}

const buildLoginForm = overrides => {
  const username = fakerFn().fakeUserName()
  const password = fakerFn().fakePassword()

  return { username, password, ...overrides }
}

test("submitting the form calls onSubmit with username and password", () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const { username, password } = buildLoginForm({ username: "boboboboob" })

  const userNameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(userNameField, username)
  userEvent.type(passwordField, password)

  userEvent.click(screen.getByRole("button", /submit/i))

  expect(handleSubmit).toHaveBeenLastCalledWith({ username, password })
})
```

### Testing custom hooks <a name ="testing-hooks"></a>

You basically would not write a specific test just for a hook. While you using your hooks in your component you will already have som good test coverage for that.
If you want to write a specific test for your hook, you could use for example [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library#:~:text=The%20react%2Dhooks%2Dtesting%2D,of%20your%20amazing%20custom%20hook.)

Here is example how you could test toggle hook without using `react-hooks-testing-library`

```jsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { useToggler } from "../toggler"

interface UseToggler {
  state: boolean
  setToFalse: () => void
  setToTrue: () => void
  toggler: () => void
}

describe("useToggler", () => {
  let result: Partial<UseToggler>
  function TestComp() {
    result = useToggler()
    return null
  }

  test("should work as expected ", () => {
    render(<TestComp />)

    expect(result.state).toBeFalsy()

    act(() => {
      if (result.setToTrue) {
        result.setToTrue()
      }
    })
    expect(result.state).toBeTruthy()

    act(() => {
      if (result.setToFalse) {
        result.setToFalse()
      }
    })
    expect(result.state).toBeFalsy()

    act(() => {
      if (result.toggler) {
        result.toggler()
        result.toggler()
      }
    })
    expect(result.state).toBeFalsy()
  })


})

```

### Performance <a name = "performance" >

React performance and how we can optimize out react projects to be as fast and tight as possible, using code splitting, lazy loading, memoization etc.

##### Code splitting <a name = "code-splitting"> </a>

Code splitting is what the name actually describes we lazy load our code to only been used when needed, this is one way of code splitting.
For example when the user enter the start page there is no reason to render the stuff that the user would not be able to use before getting around the application.
this optimize the application to become even faster and making a much more snappier experience

With Lazy imports in react we can code split our components.

```jsx
const Component = React.lazy(() => import("../AnotherComponent"))
```

to make it more useable and perhaps load the component before user really want to use,(`still lazy loaded of course`) it so we always can be 1 step ahead to make a really snappy experience we can do it like this.
This is so called `eager` loading.

```jsx
const loadComponent = () => import("../AnotherComponent")
const Component = React.lazy(loadComponent)
```

so when a element is for example focused and hover before the user clicks a button to show a expensive element to be shown we can pre load the component.

```jsx
import * as React from "react"
const loadGlob = () => import("../globe")
const Globe = React.lazy(loadGlob)

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  return (
    <div>
      <label onMouseEnter={loadGlob} onFocus={loadGlob}>
        <input type="checkbox" checked={showGlobe} onChange={e => setShowGlobe(e.target.checked)} />
        {" show globe"}
      </label>
      <div style={{ width: 400, height: 400 }}>
        <React.Suspense fallback={<div>...loading</div>}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  )
}
```

If you are using `web pack` to bundle your application it as also possible to use [magic comments](https://webpack.js.org/api/module-methods/#magic-comments) by `web pack`.

you simply put the comment as a comment before tour dynamic import, like this.

```jsx
import(/* webpackPrefetch: true */ "./Component")
```

When webpack sees this comment, it adds this to the head of the document:

```html
<link rel="prefetch" as="script" href="/static/js/1.chunk.js" />
```

it will load the javascript code ahead of time and simply store it in the cache so we get a more snappy experience.

<hr/>
##### memoization <a name ="memo"></a>

Working with memorization in React, using hooks like `useCallback` and `useMemo` we can really optimize out code. For example if we running any expensive calculation like finding what is your home town through all different cities in US it can be a pretty expensive call, as long our function is pure without any side effects we could memoize our function that we would not recalculate if the input is the same. This go in hand with all programing techniques we should only memoize,cache our values if the functions are pure,o otherwise we would get a unexpected behavior.

**useMemo** example

so only re calculate our double function when the input changes otherwise keep it in the cache

```jsx
const fn = React.useMemo(() => double(value), [value])
```

there is also `React.memo` thar we can use our component around to prevent ree-renders,
simply like:

```jsx
  const Comp = React.memo(({a,b...props}) => {
    return(
      <div>
        {a}
        {b}
      </div>
    )
  })

  // or we can do

  const MemoizedComponent = React.memo(Comp)
```

If you used classes before using hooks you probably remember the lifecycle method that check if previous props was not equal to the current prop, we can to the same with `React.memo`, check this out:

```jsx
const MemoizedComponent = React.memo(Comp, (prevProps, nextProps) => {
  console.log("nextProps", nextProps)
  if (prevProps.getItemProps !== nextProps.getItemProps) {
    // trigger re-render
    return false
  }
  if (prevProps.items !== nextProps.items) {
    return false
  }
})
```

True would not trigger a re-render while false will re-render the component.

```tsx
import React, { memo } from "react"
import styled from "@emotion/styled"

interface CountButtonProps {
  count: number
  onClick: () => void
  dataTestid?: string
}

const Button = styled.button`
  font-size: 2em;
`

const CountButton = memo(({ count, onClick, dataTestid = "count-btn" }: CountButtonProps) => {
  console.log("%c render CountButton", "background: #9C27B0; color: #fff")
  return (
    <Button onClick={onClick} data-testid={`button-${dataTestid}`}>
      {count}
    </Button>
  )
})

export default CountButton
```

```tsx
import React, { useState } from "react"
import { useCount } from "../../hooks/count"
import CountButton from "./count-button"
import { css } from "@emotion/css"

const styles = () =>
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
  `

const inputStyles = () =>
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    padding: 1rem;
    input {
      outline: 0;
    }
  `

interface NameInputProps {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function NameInput({ name, onChange }: NameInputProps) {
  return (
    <div className={inputStyles()}>
      <label htmlFor="name">
        <span>name</span>
      </label>
      <input type="text" id="name" value={name} onChange={onChange} />
    </div>
  )
}

const CountButtonMemoized = React.memo(CountButton, (prevProps, nextProps): any => {
  // compare Button props
  console.log(prevProps.count, nextProps.count)
  if (prevProps.count !== nextProps.count) {
    console.log("I will re render")
    return false
  }
})
const NameInputMemoized = React.memo(NameInput)

function Example() {
  const { count, increment } = useCount({ initialCount: 0, step: 1 })
  const [name, setName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  return (
    <div className={styles()}>
      <div>
        <CountButtonMemoized count={count} onClick={increment} />
      </div>
      <div>
        <NameInputMemoized name={name} onChange={handleChange} />
      </div>
      {name ? name + " favorite number is " + count : null}
    </div>
  )
}
export default Example
```

<hr/>
##### react context performance <a name ="react-context-performance"></a>

If you are using React context within your application that is wrapped around a lot of components, there could be a good idea to `memoize` our state and dispatch function like this:

```jsx
const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountContext.Provider value={value} {...props} />
}
```

This a a solution for some scenario's but we have to remember that the `CountProvider` and all it's children will still re-render if that state updates, even if we using `memo`.
memo only compares if something has been changed or not,shallow compare. So if that state updates we will always get a new state value and for that it will trigger a re-render.

We could change the current solution to use reducer instead of state, and create 2 providers , one for state and one for our dispatch function.
Since dispatch value will never change.This how the `React team` recommend to do it, te get as much performance as possible.

```jsx
const CountStateProvider = React.createContext()
const CountDispatchContext = React.createContext()

function countReducer(state, action) {
  switch (action.type) {
    case "INCREMENT": {
      return { ...state, count: state.count + 1 }
    }
    case "DECREMENT": {
      return { ...state, count: state.count - 1 }
    }
    case "RESET": {
      return { ...state, count: (state.count = 0) }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: 0,
  })
  return (
    <CountStateProvider.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>{children}</CountDispatchContext.Provider>
    </CountStateProvider.Provider>
  )
}
```

This is just a overhead example of how it would work, but imagine if you had a much more complex state and data to work with, then this is the way you want to do it.

<hr/>

## Suspense <a name="suspense"></a>
