import React, { useState } from "react";
import { Editor } from '@jeremyling/react-material-ui-rich-text-editor';

const initialHtml = "<p>Paragraph</p>";

export default function RichTextEditor(props) {
  const [html, setHtml] = useState(initialHtml);

  return <Editor html={html} updateHtml={(html) => setHtml(html)} />;
}