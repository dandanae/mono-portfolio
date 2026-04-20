import Image from 'next/image';
import React from 'react';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';

interface CopyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CopyImage = ({ src, alt, width, height, ...props }: CopyImageProps) => {
  const { copy, isCopied } = usePlot();
  return (
    <button
      type="button"
      aria-label={`이미지 복사 ${alt}`}
      onClick={() => copy(`/desc [${alt}](${src})`)}
      className="focus-ring hover-ring relative my-6 w-full select-none"
    >
      <CopyWrapper isCopied={isCopied}>
        <Image src={src} alt={alt} className="m-auto" width={width} height={height} {...props} />
      </CopyWrapper>
    </button>
  );
};

export default CopyImage;
