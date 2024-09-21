'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { HTMLAttributes } from 'react'

export type AutoAnimatedProps = HTMLAttributes<HTMLDivElement>

function AutoAnimated(props: AutoAnimatedProps) {
  const [parent] = useAutoAnimate()

  return <div ref={parent} {...props} />
}
AutoAnimated.displayName = 'AutoAnimated'

export { AutoAnimated }
