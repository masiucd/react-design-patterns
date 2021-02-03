import styled from "@emotion/styled"
import React from "react"

const StyledItem = styled.li`
  padding: 0.5rem 0;
  font-size: 1.2rem;
  span {
    color: var(--background);
    background-color: var(--textColor);
    padding: 0.3rem;
  }
`

interface JsonItemProps {
  data: Record<string, string | number>
}

export const JsonItem: React.FC<JsonItemProps> = ({ data }) => {
  return (
    <StyledItem>
      <p>
        {data.id} {data.name && data.name} {data.title && data.title}
        {data.username && <span>{data.username}</span>}
      </p>
    </StyledItem>
  )
}

// {/* <li>{usersList && usersList[userId as any]}</li> */}
