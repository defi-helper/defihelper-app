import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import { Remarkable } from 'remarkable'
import TurndownService from 'turndown'
import Italic from '@tiptap/extension-italic'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { Button } from '~/common/button'
import * as styles from './markdown-editor.css'

export type MarkdownEditorProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  label?: string
  defaultValue?: string
}

const md = new Remarkable()

const turndownService = new TurndownService()

export const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const [focused, setFocus] = useState(false)

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Link, Bold, Italic],
    content: md.render(props.value),
    onUpdate: (editorProps) =>
      props.onChange(turndownService.turndown(editorProps.editor.getHTML())),
  })

  const setLink = () => {
    // eslint-disable-next-line no-alert
    const url = window.prompt('URL')

    if (!url || !editor) return

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  useEffect(() => {
    if (!editor || props.disabled === undefined) return

    editor.setOptions({ editable: !props.disabled })
  }, [editor, props.disabled])

  const handleOnFocus = () => {
    setFocus(true)
  }

  const handleOnBlur = () => {
    setFocus(false)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <label
        htmlFor="markdown"
        className={clsx(styles.label, {
          [styles.focusedLabel]: focused || !editor?.isEmpty,
        })}
      >
        {props.label}
      </label>
      {editor && (
        <BubbleMenu editor={editor}>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            color="blue"
            variant={editor.isActive('bold') ? 'contained' : 'outlined'}
            type="button"
            size="small"
          >
            bold
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color="blue"
            variant={editor.isActive('italic') ? 'contained' : 'outlined'}
            type="button"
            size="small"
          >
            italic
          </Button>
          <Button
            onClick={setLink}
            color="blue"
            variant={editor.isActive('link') ? 'contained' : 'outlined'}
            type="button"
            size="small"
          >
            link
          </Button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        disabled={props.disabled}
        className={clsx(styles.input)}
        id="markdown"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  )
}
