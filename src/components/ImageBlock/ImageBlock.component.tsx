import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { Languages } from "src/interfaces/common.interfaces";
import { convertRelativeUrl } from "src/utils/helpers";
import styled, { css } from "styled-components";
import { ImageBlockProps, ImageStyleTypes } from "./ImageBlock.interfaces";

interface ImageWrapperProps {
  imageStyle?: ImageStyleTypes;
}

const ImageWrapper = styled.div<ImageWrapperProps>`
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;

  ${({ imageStyle, theme }) =>
    imageStyle &&
    imageStyle === ImageStyleTypes.Outlined &&
    css`
      position: relative;
      overflow: hidden;
      border: 2px solid ${theme.colors.logo};
      box-shadow: 0 0 10px ${theme.colors.logo},
        inset 0 0 10px ${theme.colors.logo};

      > div {
        display: block !important;
      }
    `}
`;

export const ImageBlock: FC<ImageBlockProps> = ({ imageData }) => {
  const { locale } = useRouter();

  return (
    <ImageWrapper imageStyle={imageData.imageStyle}>
      <Image
        src={convertRelativeUrl(imageData.image.file.url[locale as Languages])}
        height={imageData.image.file.details.image.height[locale as Languages]}
        width={imageData.image.file.details.image.width[locale as Languages]}
        alt={imageData.image.title[locale as Languages]}
        loading="lazy"
      />
    </ImageWrapper>
  );
};

export default ImageBlock;
