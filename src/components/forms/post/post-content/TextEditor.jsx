/* -------------------- Styles -------------------- */
import styles from './TextEditor.module.css'
/* -------------------- Hooks -------------------- */
import { useContext, useRef } from 'react'
/* -------------------- Context -------------------- */
import { PostFormContext } from '../../../../contexts/post-form/PostFormContext'
/* -------------------- Components -------------------- */
import { Editor } from '@tinymce/tinymce-react'
/* -------------------- Functions -------------------- */
import { validateContentInput } from '../../../../utils/new-post'

/* Component for post content */
const TextEditor = () => {
  const editorRef = useRef(null)
  const { postData, setPostData, setValidFormData, setErrorMsgs } =
    useContext(PostFormContext)
  // API key for TinyMCE
  const apiKey = import.meta.env.VITE_TINY_MCE_API_KEY

  // Handler for content input
  // eslint-disable-next-line no-unused-vars
  const handleEditorChange = (content, _editor) => {
    setPostData((prevPostData) => ({ ...prevPostData, content }))

    validateContentInput(content, setValidFormData, setErrorMsgs)
  }

  return (
    <>
      <div className={styles.formInput}>
        {/* Post content  */}
        <Editor
          id="content"
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'accordion',
              'advlist',
              'anchor',
              'autolink',
              // 'autoresize',
              'autosave',
              'charmap',
              'code',
              'codesample',
              'directionality',
              'emoticons',
              'fullscreen',
              'help',
              'image',
              'importcss',
              'insertdatetime',
              'link',
              'lists',
              'media',
              'nonbreaking',
              'pagebreak',
              'preview',
              // 'quickbars',
              'save',
              'searchreplace',
              'table',
              'visualblocks',
              'visualchars',
              'wordcount',
            ],
            toolbar:
              'undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link table | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          value={postData.content}
          onEditorChange={handleEditorChange}
        />
      </div>
    </>
  )
}

export default TextEditor
