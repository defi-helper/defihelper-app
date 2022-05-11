import { Remarkable } from 'remarkable'
import RemarkableReactRenderer from 'remarkable-react'

import { Link } from '~/common/link'
import { Typography } from '~/common/typography'

const md = new Remarkable()
md.renderer = new RemarkableReactRenderer({
  components: {
    a: ({ children, href }) => {
      return (
        <Link target="_blank" href={href} color="blue" underline="always">
          {children}
        </Link>
      )
    },
    h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
    h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
    h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
    h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
    h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
    p: ({ children }) => <Typography variant="body2">{children}</Typography>,
    strong: ({ children }) => (
      <Typography variant="inherit" weight="bold">
        {children}
      </Typography>
    ),
    em: ({ children }) => (
      <Typography variant="inherit" as="em">
        {children}
      </Typography>
    ),
  },
})

export type MarkdownRenderProps = {
  children?: string
}

export const MarkdownRender: React.VFC<MarkdownRenderProps> = (props) => {
  return props.children ? <>{md.render(props.children)}</> : null
}
