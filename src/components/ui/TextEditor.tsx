'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const TextEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div className="border border-[#DEDBDB] rounded-xl overflow-hidden">
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={modules}
        theme="snow"
        placeholder="Write something..."
      />
    </div>
  );
};

export default TextEditor;
