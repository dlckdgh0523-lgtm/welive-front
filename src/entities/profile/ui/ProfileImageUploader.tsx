import { useState, useEffect, type ChangeEvent } from 'react';
import Image from 'next/image';

interface ProfileImageUploaderProps {
  onFileChange: (file: File | null) => void;
  initialImageUrl?: string;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ProfileImageUploader({
  onFileChange,
  initialImageUrl,
}: ProfileImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const resetInput = (input: HTMLInputElement) => {
    input.value = '';
    onFileChange(null);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert('JPG, PNG, WEBP 형식의 이미지만 업로드할 수 있습니다.');
      resetInput(input);
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert('프로필 이미지는 10MB 이하만 업로드할 수 있습니다.');
      resetInput(input);
      return;
    }

    onFileChange(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  return (
    <div className='relative mb-6 h-[100px] w-[100px] rounded-full border border-gray-200'>
      <Image
        src={previewUrl ?? '/img/profile.svg'}
        alt='프로필 이미지'
        fill
        className='rounded-full object-cover'
      />

      <label
        htmlFor='profileImageUpload'
        className='hover:border-main absolute right-0 bottom-0 z-1 h-[40px] w-[40px] cursor-pointer rounded-full border border-gray-200 bg-white hover:border-2'
      >
        <Image
          src='/img/edit.svg'
          alt='수정 아이콘'
          width={18}
          height={18}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />

        <input
          type='file'
          accept='image/jpeg,image/png,image/webp'
          id='profileImageUpload'
          className='hidden'
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}