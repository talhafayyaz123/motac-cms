'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';

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
    // ['link', 'image', 'video'],
    ['clean'],
  ],
};

// Define the props interface
interface TextEditorProps {
  control: any;
  name: string;
  error?: string | undefined;
}

const TextEditor: React.FC<TextEditorProps> = ({ control, name, error }) => {
  return (
    <div className="border border-[#DEDBDB] rounded-xl overflow-hidden">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            theme="snow"
            placeholder="Write something..."
          />
        )}
      />
      {error && <p className="m-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextEditor;
