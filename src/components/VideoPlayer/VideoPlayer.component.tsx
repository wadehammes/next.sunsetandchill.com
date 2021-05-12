import { FC, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import styled, { css } from "styled-components";
import { SectionSize } from "src/components/PageSection/PageSection.interfaces";

interface VideoWrapperProps {
  noMargin?: boolean;
  spacing?: SectionSize;
}

const VideoWrapper = styled.div<VideoWrapperProps>`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  width: 100%;
  max-width: 100%;
  margin: ${({ theme, noMargin }) => (noMargin ? 0 : `${theme.sizing.main} 0`)};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.black};

  ${({ spacing }) =>
    spacing === SectionSize.NoTopPadding &&
    css`
      margin-top: 0;
    `}

  .reactPlayer {
    position: absolute;
    border-radius: ${({ theme }) => theme.borderRadius.card};
    overflow: hidden;
    top: 0;
    left: 0;
  }
`;

interface VideoPlayerProps {
  url: string;
  noMargin?: boolean;
  spacing?: SectionSize;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  url,
  noMargin = false,
  spacing = SectionSize.Regular,
}) => {
  const { inView, ref } = useInView({});
  const [played, setPlayed] = useState<boolean>(false);

  return (
    <VideoWrapper ref={ref} noMargin={noMargin} spacing={spacing}>
      <ReactPlayer
        className="reactPlayer"
        url={url}
        playing={played && inView}
        width="100%"
        height="100%"
        controls
        onPlay={() => setPlayed(true)}
        onPause={() => setPlayed(false)}
        onEnded={() => setPlayed(false)}
        config={{
          youtube: {
            playerVars: {
              rel: 0,
            },
          },
        }}
      />
    </VideoWrapper>
  );
};

export default VideoPlayer;
