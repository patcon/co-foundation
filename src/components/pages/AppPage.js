import React from 'react'
import { Heading, Link, Pane, majorScale } from 'evergreen-ui'

export const AppPage = props => {
  const { title, byline, moreLink, children } = props
  return (
    <Pane>
      <Pane>
        <Heading size={900} textTransform="uppercase" is="h1">{title}</Heading>
        <Heading is="h5">
          {byline + ' '}
          {moreLink
            ? <Link target="_blank" href={moreLink}>Read More</Link>
            : null
          }
        </Heading>
        <hr style={{ marginTop: majorScale(3) }} />
      </Pane>
      <Pane paddingTop={majorScale(4)} paddingBottom={150}>
        {children}
      </Pane>
    </Pane>
  )
}