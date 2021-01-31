import { Link } from "react-router-dom"
import { css, cx } from "@emotion/css"

const navItemsStyles = () =>
  css`
    display: flex;
    li {
      padding: 0.5rem;
      transition: var(--main-trans);
    }
    a {
      font-size: 1em;
      color: var(--textColor);
      transition: var(--main-trans);
      padding: 0.3em;
      &:hover {
        color: var(--background);
        background-color: var(--textColor);
      }
    }
  `

export const NavList = () => {
  const navListData = [
    {
      name: "home",
      path: "",
    },
    {
      name: "memoization",
      path: "memo",
    },
    {
      name: "faq",
      path: "faq",
    },
    {
      name: "game",
      path: "game",
    },
    {
      name: "form",
      path: "login",
    },
    {
      name: "pokemon",
      path: "pokemon",
    },
    {
      name: "contact",
      path: "contact",
    },
  ]

  const firstLetterToUppercase = (item: string) => item[0].toUpperCase() + item.slice(1)

  return (
    <ul className={`main-nav-list ${cx(navItemsStyles())}`}>
      {navListData.map(item => (
        <li key={item.name}>
          <Link to={`/${item.path}`}>{firstLetterToUppercase(item.name)}</Link>
        </li>
      ))}
    </ul>
  )
}
