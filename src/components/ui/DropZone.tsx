import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import AlertService from '@/services/alertService';

interface DropZoneProps {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  onChange?: (files: File[]) => void;
}

export default function DropZone({ setImages, onChange }: DropZoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const validFiles: File[] = [];

      acceptedFiles.forEach((file) => {
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        img.src = url;

        img.onload = async () => {
          const aspectRatio = img.width / img.height;

          if (Math.abs(aspectRatio - 16 / 9) < 0.01) {
            validFiles.push(file);
            setImages((prevImages) => [...prevImages, file]);
          } else {
            try {
              await AlertService.alert(
                '',
                'Only images with 16:9 aspect ratio are allowed',
                'warning',
                'OK',
              );
            } catch (error) {
              console.error('Something went wrong', error);
            }
          }
          URL.revokeObjectURL(url);

          if (onChange) {
            onChange(validFiles);
          }
        };
      });
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
        Drop files here or click to upload.
      </p>
    </div>
  );
}
