import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import { Remarkable } from 'remarkable'
import TurndownService from 'turndown'
import Italic from '@tiptap/extension-italic'
import { useEffect } from 'react'
import { makeStyles, Button } from '@material-ui/core'

export type MarkdownEditorProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const md = new Remarkable()

const turndownService = new TurndownService()

const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid black',

    '& .ProseMirror': {
      outline: 'none',
      height: '100%',
      padding: 1
    }
  }
}))

export const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const classes = useStyles()

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Link, Bold, Italic],
    content: md.render(props.value),
    onUpdate: (editorProps) =>
      props.onChange(turndownService.turndown(editorProps.editor.getHTML()))
  })

  const setLink = () => {
    // eslint-disable-next-line no-alert
    const url = window.prompt('URL')

    if (!url) return

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  useEffect(() => {
    if (!editor || props.disabled === undefined) return

    editor.setOptions({ editable: !props.disabled })
  }, [editor, props.disabled])

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor}>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            color="primary"
            variant={editor.isActive('bold') ? 'contained' : 'outlined'}
            type="button"
          >
            bold
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color="primary"
            variant={editor.isActive('italic') ? 'contained' : 'outlined'}
            type="button"
          >
            italic
          </Button>
          <Button
            onClick={setLink}
            color="primary"
            variant={editor.isActive('link') ? 'contained' : 'outlined'}
            type="button"
          >
            link
          </Button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        disabled={props.disabled}
        className={classes.root}
      />
    </>
  )
}
