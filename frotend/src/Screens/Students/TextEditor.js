import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const TextEditor = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  return (
    <div className="textEditor">
      <header className="textEditor-hearders">
        Rich Text Editor Example
      </header>
      <Editor editorState={editorState} />
    </div>
  )
}
export default TextEditor;