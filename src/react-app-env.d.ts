/// <reference types="react-scripts" />

type EthereumEventMap = {
  connect: unknown
  chainChanged: string | number
  accountsChanged: string[]
  networkChanged: string | number
  close: number
}

interface Window {
  ethereum?: {
    isMetaMask?: true
    isTrust?: true
    on?: <K extends keyof EthereumEventMap>(
      type: K,
      listener: (ev: EthereumEventMap[K], options?: unknown) => void
    ) => void
    removeListener?: <K extends keyof EthereumEventMap>(
      type: K,
      listener: (ev: EthereumEventMap[K], options?: unknown) => void
    ) => void
    request?: (arg: Record<string, unknown>) => Promise<void>
  }
  dataLayer?: string[]
  ym?: (id: number, type: string, event: string) => void
  axios: unknown
}

declare module 'remarkable-react' {
  import Renderer from 'remarkable/lib/renderer'

  type RemarkableProp =
    | boolean
    | ((...args: unknown[]) => boolean)
    | ((...args: unknown[]) => unknown)

  type Options = {
    keyGen: (token: unknown, index: number) => string

    remarkableProps: {
      align: RemarkableProp
      alt: RemarkableProp
      block: RemarkableProp
      content: RemarkableProp
      hLevel: RemarkableProp
      href: RemarkableProp
      id: RemarkableProp
      level: RemarkableProp
      lines: RemarkableProp
      linkTarget: RemarkableProp
      order: RemarkableProp
      params: RemarkableProp
      src: RemarkableProp
      subId: RemarkableProp
      tight: RemarkableProp
      title: RemarkableProp
      type: RemarkableProp
    }

    components: {
      a: React.ElementType // Default: <a />
      blockquote: React.ElementType // Default: <blockquote />
      br: React.ElementType // Default: <br />
      code: React.ElementType // Default: <code />
      del: React.ElementType // Default: <del />
      em: React.ElementType // Default: <em />
      h1: React.ElementType // Default: <h1 />
      h2: React.ElementType // Default: <h2 />
      h3: React.ElementType // Default: <h3 />
      h4: React.ElementType // Default: <h4 />
      h5: React.ElementType // Default: <h5 />
      h6: React.ElementType // Default: <h6 />
      html: React.ElementType // Default: <div />
      img: React.ElementType // Default: <img />
      ins: React.ElementType // Default: <ins />
      li: React.ElementType // Default: <li />
      mark: React.ElementType // Default: <mark />
      ol: React.ElementType // Default: <ol />
      p: React.ElementType // Default: <p />
      pre: React.ElementType // Default: <pre />
      strong: React.ElementType // Default: <strong />
      sub: React.ElementType // Default: <sub />
      sup: React.ElementType // Default: <sup />
      table: React.ElementType // Default: <table />
      tbody: React.ElementType // Default: <tbody />
      td: React.ElementType // Default: <td />
      th: React.ElementType // Default: <th />
      thead: React.ElementType // Default: <thead />
      tr: React.ElementType // Default: <tr />
      ul: React.ElementType // Default: <ul />

      /**
       * Custom components that are defined in the tokens
       * section below.
       */
      [key: string]: React.ElementType
    }

    tokens: {
      [key: string]: string
    }

    children: {
      footnote_anchor: (...args: unknown[]) => React.JSX
      footnote_ref: (...args: unknown[]) => React.JSX
      htmlblock: (...args: unknown[]) => React.JSX
    }
  }

  class RemarkableReactRenderer extends Renderer {
    constructor(options?: Options)

    render(
      tokens: Remarkable.Token[],
      options: Remarkable.Options,
      env: Remarkable.Env
    ): React.JSX
  }

  export default RemarkableReactRenderer
}
