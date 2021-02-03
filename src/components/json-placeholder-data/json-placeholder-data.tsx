import { css, cx } from "@emotion/css"
import { useEffect, useState } from "react"
import { fetchData } from "../../utils/fetch"
import { JsonItem } from "./json-item"

const jsonPlaceholder = fetchData("https://jsonplaceholder.typicode.com")
const users = jsonPlaceholder("users")
const albums = jsonPlaceholder("albums")

const wrapperStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
`

const JsonPlaceholderData = () => {
  const [usersList, setUsersList] = useState<Record<string, string | number>[] | null>(null)
  const [albumsList, setAlbumsList] = useState<Record<string, string | number>[] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const usersResponse = await users((x: Record<string, string | number>[]) =>
        x.map(user => user)
      )
      const albumsResponse = await albums((x: Record<string, string | number>[]) =>
        x.map(album => album)
      )
      setUsersList(usersResponse)
      setAlbumsList(albumsResponse)
    }
    getData()
  }, [])

  return (
    <div className={cx(wrapperStyles)}>
      <ul>
        <h3 data-testid="users-title">users</h3>
        {usersList?.map(d => (
          <JsonItem key={d.id} data={d} />
        ))}
      </ul>

      <ul>
        <h3 data-testid="albums-title">albums</h3>
        {albumsList?.slice(0, 10)?.map(d => (
          <JsonItem key={d.id} data={d} />
        ))}
      </ul>
    </div>
  )
}

export default JsonPlaceholderData
