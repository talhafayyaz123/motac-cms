import Image from 'next/image';
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
        <Image alt="image" src="/photo.svg" height={50} width={50} />
      </div>
      <p className="text-sm text-gray-500">
        Drop files here or click to upload. (This is just a demo dropzone.
        Selected files are not actually uploaded.)
      </p>
    </div>
  );
}
