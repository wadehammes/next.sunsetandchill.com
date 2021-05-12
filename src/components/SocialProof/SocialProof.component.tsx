import React, { FC } from "react";
import { useReviews } from "src/hooks/useReviews";
import { Alignment } from "src/interfaces/common.interfaces";
import { GoldStars } from "src/styles/icons/GoldStars.icon";
import styled, { css } from "styled-components";

const BEST_RATING = 5;
const SVG_WIDTH = 140;

const SocialProofWrapper = styled.a`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: column nowrap;
  max-width: 24em;
  color: inherit;
  min-height: 4em;
`;

interface StarWrapperProps {
  rating: number | undefined;
  align?: Alignment;
}

const StarWrapper = styled.div<StarWrapperProps>`
  overflow: hidden;
  position: relative;
  width: ${({ rating }) =>
    rating ? `${Math.floor((rating / BEST_RATING) * SVG_WIDTH)}px` : "100%"};

  ${({ align }) =>
    align === Alignment.Center &&
    css`
      margin: 0 auto;
    `}

  > svg {
    width: ${`${SVG_WIDTH}px`};
  }
`;

const Headshot = styled.img`
  position: relative;
  margin-right: -0.5em;
  border: 2px solid ${({ theme }) => theme.colors.purple.variants.neon};
  border-radius: 1000px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0 0 0;

  span {
    padding-left: 1rem;
  }
`;

interface SocialProofProps {
  testId?: string;
  align?: Alignment;
}

export const SocialProof: FC<SocialProofProps> = ({
  testId = "socialProofWidget",
  align = Alignment.Center,
}) => {
  const { reviewsMeta } = useReviews();

  return (
    <SocialProofWrapper
      href="https://embedsocial.com/reviews/rhythm"
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
    >
      {!isNaN(reviewsMeta?.averageRating ?? NaN) && (
        <>
          <StarWrapper rating={reviewsMeta.averageRating} align={align}>
            <GoldStars />
          </StarWrapper>
          <Rating>
            {reviewsMeta.userHeadshots?.map(
              (headshot: string, index: number) => (
                <Headshot
                  src={headshot}
                  alt=""
                  role="presentation"
                  style={{ zIndex: index }}
                  height="32"
                  width="32"
                />
              ),
            )}
            <span>
              {reviewsMeta.averageRating?.toFixed(1)} rating out of{" "}
              {reviewsMeta.total} reviews
            </span>
          </Rating>
        </>
      )}
    </SocialProofWrapper>
  );
};

export default SocialProof;
