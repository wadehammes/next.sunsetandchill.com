import { FC } from "react";
import { VideoBlockProps } from "src/components/VideoBlock/VideoBlock.interfaces";
import styled from "styled-components";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer.component";
import { P } from "src/components/Typography";
import { ContentfulColors, Languages } from "src/interfaces/common.interfaces";
import { useRouter } from "next/router";

const VideoBlockWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const VideoCaption = styled(P)`
  padding-top: 0.75rem;
  font-size: 0.9rem;
`;

export const VideoBlock: FC<VideoBlockProps> = ({
  fields,
  lightVariant = true,
}) => {
  const { locale } = useRouter();

  return fields ? (
    <VideoBlockWrapper>
      <VideoPlayer url={fields.videoUrl} spacing={fields.videoSpacing} />
      {fields.videoCaption && (
        <VideoCaption
          as="figcaption"
          color={
            lightVariant ? ContentfulColors.White : ContentfulColors.DarkPurple
          }
        >
          {fields.videoCaption[locale as Languages]}
        </VideoCaption>
      )}
    </VideoBlockWrapper>
  ) : null;
};

export default VideoBlock;
