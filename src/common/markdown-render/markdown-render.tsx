import { Remarkable } from 'remarkable'
import RemarkableReactRenderer from 'remarkable-react'

const md = new Remarkable()
md.renderer = new RemarkableReactRenderer()

export type MarkdownRenderProps = {
  children?: string
}

export const MarkdownRender: React.VFC<MarkdownRenderProps> = (props) => {
  return props.children ? <div>{md.render(props.children)}</div> : null
}
