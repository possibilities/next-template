import React, { ReactNode } from 'react'
import Typography from '@material-ui/core/Typography'
import useSWR from 'swr'

interface Widget {
  wid: string
  name: string
}

const Page = (): ReactNode => {
  const { data: widgets } = useSWR<Widget[]>('/api/widgets')
  if (!widgets) return <Typography>Loading...</Typography>
  return (
    <>
      {widgets.map(widget => (
        <Typography key={widget.wid}>{widget.name}</Typography>
      ))}
    </>
  )
}

export default Page
