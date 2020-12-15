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
