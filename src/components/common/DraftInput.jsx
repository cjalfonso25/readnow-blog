import React, { useRef } from "react";
import { Editor, RichUtils, convertToRaw } from "draft-js";
import { BLOCK_TYPES, INLINE_STYLES } from "../../utils/richUtils";

const DraftInput = ({
  label,
  name,
  editorState,
  currentPost,
  setEditorState,
  setCurrentPost,
}) => {
  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setCurrentPost({
      ...currentPost,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    });
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
    }
  };

  const toggleInlineStyle = (e) => {
    e.preventDefault();
    let style = e.target.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockStyle = (e) => {
    let style = e.target.getAttribute("data-style");
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "code-block") {
      return "code-block";
    }

    if (type === "blockquote") {
      return "blockquote";
    }
  };

  return (
    <div onClick={focusEditor} className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="content-editor">
        <div className="controls-wrapper">
          {BLOCK_TYPES.map((type) => (
            <button
              key={type.label}
              onMouseDown={(e) => toggleBlockStyle(e)}
              data-style={type.style}
              className="btn"
            >
              {type.label}
            </button>
          ))}

          {INLINE_STYLES.map((type) => (
            <button
              key={type.label}
              onMouseDown={(e) => toggleInlineStyle(e)}
              data-style={type.style}
              className="btn"
            >
              {type.label}
            </button>
          ))}
        </div>

        <Editor
          placeholder="Enter your content here"
          ref={editor}
          editorState={editorState}
          blockStyleFn={(contentBlock) => myBlockStyleFn(contentBlock)}
          handleKeyCommand={(command) => handleKeyCommand(command)}
          onChange={(editorState) => handleEditorChange(editorState)}
        />
      </div>
    </div>
  );
};

export default DraftInput;
