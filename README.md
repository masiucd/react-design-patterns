# Epic React 


### How to create React elements without JSX

React is javascript so basicclu under the hood it similar like you are problbly used to with the regular DOM api.
Difference is the React using the virtual DOM to gain as much preformenvce as possible.
 
*How JSX looks under the hood, how to create a `div` container with some children*
```jsx
    const rootElement = document.getElementById('root')

    const element = React.createElement('div', {
      className: 'container',
      children: [
        React.createElement('span', null, 'Legia'),
        ' ',
        React.createElement('span', null, 'Warszawa!'),
      ],
    })

    ReactDOM.render(element, rootElement)

```
 
