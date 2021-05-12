// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/media-has-caption */
import React, { FC } from "react";
import styled from "styled-components";

interface VideoElementProps {
  width: number;
  height: number;
  source: string;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}

const VideoWrapper = styled.div`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;

  video {
    display: block;
    border-radius: ${({ theme }) => theme.borderRadius.card};
    overflow: hidden;
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
`;

export const VideoElement: FC<VideoElementProps> = ({
  width,
  height,
  source,
  muted = true,
  autoPlay = true,
  loop = true,
}) => (
  <VideoWrapper>
    <video
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      width={width}
      height={height}
      src={source}
      playsInline
    />
  </VideoWrapper>
);

export default VideoElement;
