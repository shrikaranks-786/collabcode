import React, { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";
import { css } from "@codemirror/lang-css";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";

function Editor() {
  const editorRef = useRef(null);
  const [editorView, setEditorView] = useState(null);
  const [language, setLanguage] = useState("javascript");

  // Initialize the editor
  useEffect(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: "Select a language from the dropdown to start coding!",
        extensions: [
          basicSetup,
          javascript(), // default to JavaScript
          dracula, // apply Dracula theme
          EditorView.theme({
            "&": {
              fontSize: "16px", // Default font size
            },
            ".cm-content": {
              fontFamily: "monospace",
            },
          }),
        ],
      });

      const view = new EditorView({
        state,
        parent: editorRef.current,
      });

      setEditorView(view);

      return () => {
        view.destroy();
      };
    }
  }, []);

  // Update language dynamically
  useEffect(() => {
    if (editorView) {
      const extensions = [
        basicSetup,
        dracula, // Add Dracula theme
        language === "javascript" && javascript(),
        language === "html" && html(),
        language === "python" && python(),
        language === "css" && css(),
        language === "cpp" && cpp(),
        language === "java" && java(),
      ].filter(Boolean);

      const newState = EditorState.create({
        doc: editorView.state.doc.toString(),
        extensions,
      });

      editorView.setState(newState);
    }
  }, [language, editorView]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div style={{ marginBottom: "10px" }}>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: "5px", borderRadius: "5px", marginLeft: "10px" ,marginTop:"10px"}}
        >
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div
        ref={editorRef}
        id="realtimeeditor"
        style={{
          border: "1px solid #ccc",
          height: "350px", // Fixed height for the editor
          overflowY: "auto", // Scroll when content overflows vertically
          backgroundColor: "#282a36", // Optional: Matches Dracula background
          width: "100%", // Ensure full width
        }}
      ></div>
    </div>
  );
}

export default Editor;
