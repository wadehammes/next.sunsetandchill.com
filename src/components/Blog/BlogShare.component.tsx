import { FC } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { EmailShare } from "src/styles/icons/EmailShare.icon";
import { FacebookShare } from "src/styles/icons/FacebookShare.icon";
import { LinkedinShare } from "src/styles/icons/LinkedinShare.icon";
import { TwitterShare } from "src/styles/icons/TwitterShare.icon";
import styled, { css } from "styled-components";

interface BlogShareContainerProps {
  visible?: boolean;
}

const BlogShareContainer = styled.div<BlogShareContainerProps>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-flow: row nowrap;
  width: 100%;
  bottom: 0.75em;
  z-index: 10;
  overflow: hidden;
  transform: translateY(10em);
  transition: transform 0.25s ease-in-out;

  > button {
    margin-bottom: 0.25em;
    margin-right: 0.5em;
  }

  @media screen and (min-width: 60em) {
    left: 0.75em;
    bottom: auto;
    top: 50%;
    flex-flow: column nowrap;
    margin-left: 0;
    width: auto;
    transform: translateX(-10em);
  }

  ${({ visible }) =>
    visible &&
    css`
      transform: translateY(0);

      @media screen and (min-width: 60em) {
        transform: translateX(0);
      }
    `}
`;

interface BlogShareProps {
  url: string;
  title: string;
  description: string;
  hashtag: string;
  hashtags: string[];
  visible: boolean;
}

export const BlogShare: FC<BlogShareProps> = ({
  url,
  title = "",
  description = "",
  hashtag = "",
  hashtags = [],
  visible = true,
}) => (
  <BlogShareContainer visible={visible}>
    <FacebookShareButton url={url} quote={description} hashtag={hashtag}>
      <FacebookShare />
    </FacebookShareButton>
    <TwitterShareButton
      url={url}
      title={title}
      via="GotRhythmHQ"
      hashtags={hashtags}
    >
      <TwitterShare />
    </TwitterShareButton>
    <LinkedinShareButton
      url={url}
      title={title}
      summary={description}
      source={url}
    >
      <LinkedinShare />
    </LinkedinShareButton>
    <EmailShareButton url={url} subject={title} body={description}>
      <EmailShare />
    </EmailShareButton>
  </BlogShareContainer>
);

export default BlogShare;
