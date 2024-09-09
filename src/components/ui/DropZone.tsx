import React from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function DropZone({ images, setImages }: DropZoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setImages([...images, ...acceptedFiles]);
    },
    accept: {
      'image/*': [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="flex justify-center mb-2">
        <svg
          className="w-10 h-10 text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.25 12.75h-3.75v4.5h-3v-4.5H6.75L12 7.5l5.25 5.25z" />
        </svg>
      </div>
      <p className="text-sm text-gray-500">
        Drop files here or click to upload. (This is just a demo dropzone.
        Selected files are not actually uploaded.)
      </p>
    </div>
  );
}
