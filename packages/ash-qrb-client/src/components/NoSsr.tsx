import dynamic from 'next/dynamic'
import React from 'react'

// biome-ignore lint/complexity/noUselessFragments: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const NoSsr = (props: {
  children:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined
}) => <React.Fragment>{props.children}</React.Fragment>

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
})
