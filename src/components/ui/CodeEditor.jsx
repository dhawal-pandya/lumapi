import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <Editor
      height="200px"
      language={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
      }}
    />
  );
};

export default CodeEditor;
