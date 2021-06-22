import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type PortalProps = {
  container?: Element
}

export const Portal: React.FC<PortalProps> = (props) => {
  const { children, container } = props

  const [mountNode, setMountNode] = useState<HTMLElement | Element | null>(null)

  useEffect(() => {
    setMountNode(container ?? document.body)

    return () => setMountNode(null)
  }, [container])

  return mountNode ? createPortal(children, mountNode) : mountNode
}
