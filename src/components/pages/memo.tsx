import React from "react"
import { Counter } from "../memoazation/counter"
import { Parent } from "../memoazation/parent"

const MemoizationPage = () => {
  return (
    <div>
      <Parent />
      <Counter />
    </div>
  )
}

export default MemoizationPage
