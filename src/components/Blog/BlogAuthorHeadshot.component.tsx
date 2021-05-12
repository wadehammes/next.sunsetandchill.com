import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { Languages, MediaType } from "src/interfaces/common.interfaces";
import { convertRelativeUrl } from "src/utils/helpers";
import styled, { css } from "styled-components";

interface HeadshotProps {
  size: number;
}

const Headshot = styled.div<HeadshotProps>`
  display: flex;
  overflow: hidden;

  img {
    border-radius: 1000px !important;
  }

  ${({ size }) =>
    size &&
    css`
      height: ${size / 2}px;
      width: ${size / 2}px;
    `}
`;

const HeadshotBorder = styled.div<HeadshotProps>`
  display: flex;
  border-radius: 1000px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.logo};
  padding: 2px;
  margin-right: 0.5rem;
  box-sizing: content-box;

  ${({ size }) =>
    size &&
    css`
      height: ${size / 2}px;
      width: ${size / 2}px;
      flex-basis: ${size / 2}px;
    `}
`;

interface BlogAuthorHeadshotProps {
  headshot: MediaType;
  altTag?: string;
  size: number;
}

export const BlogAuthorHeadshot: FC<BlogAuthorHeadshotProps> = ({
  headshot,
  size = 60,
  altTag = "",
}) => {
  const { locale } = useRouter();

  return (
    headshot && (
      <HeadshotBorder size={size}>
        <Headshot size={size}>
          <Image
            src={convertRelativeUrl(headshot.file.url[locale as Languages])}
            height={size}
            width={size}
            alt={altTag}
            loading="lazy"
          />
        </Headshot>
      </HeadshotBorder>
    )
  );
};
