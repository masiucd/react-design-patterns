import { css, cx } from "@emotion/css"
import { useCallback, useEffect, useState } from "react"
import { tasks } from "../../data/tasks"

const styles = () =>
  css`
    ul {
      padding: 1rem;
    }
  `

const liStyles = (completed: boolean) => {
  return css`
    box-shadow: var(--shadowXl);
    font-size: 3rem;
    padding: 3rem 1rem;
    margin: 1rem 0;
    color: ${completed ? "var(--green)" : "var(--red)"};
  `
}

interface Task {
  userId: number
  id: number
  title: string
  completed: boolean
}

const InfiniteScroll = () => {
  const [tasksData, setTasksData] = useState<Task[]>([...tasks.slice(0, 5)])
  const [hasMore, setHasMore] = useState(tasks.length > 5)

  const loadData = useCallback(() => {
    const currentLength = tasksData.length
    const moreData = currentLength < tasks.length
    const nextEdges = moreData ? tasks.slice(currentLength, currentLength * 2) : []

    setHasMore(moreData)
    setTasksData([...tasksData, ...nextEdges])
  }, [tasksData])

  const scrollListener = useCallback(() => {
    if (!hasMore) {
      return
    }
    if (
      window.innerHeight + document.documentElement.scrollTop + 20 >=
      document.documentElement.offsetHeight
    ) {
      loadData()
      console.log(true)
    }
  }, [hasMore, loadData])

  useEffect(() => {
    window.addEventListener("scroll", scrollListener)
    return () => {
      window.removeEventListener("scroll", scrollListener)
    }
  }, [scrollListener])

  return (
    <div className={cx(styles())}>
      <ul data-testid="task-list-InfiniteScroll">
        {tasksData.map(task => (
          <li key={task.id} className={cx(liStyles(task.completed))}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfiniteScroll
