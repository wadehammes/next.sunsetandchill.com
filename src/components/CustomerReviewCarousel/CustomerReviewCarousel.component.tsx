import { FC, useEffect, useRef, useState } from "react";
import { CustomerReview } from "src/components/CustomerReview/CustomerReview.component";
import styled, { css, keyframes } from "styled-components";
import {
  CustomerReviewCarouselType,
  EmbedSocialReviewType,
} from "src/components/CustomerReviewCarousel/CustomerReviewCarousel.interfaces";
import { useReviews } from "src/hooks/useReviews";

const CAROUSEL_HEIGHT = "21rem";

const CarouselWrapper = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.sizing.main};
  height: ${CAROUSEL_HEIGHT};
`;

const marquee = (width: number) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${width}px);
  }
`;

interface CarouselProps {
  carouselWidth?: number;
}

const Carousel = styled.div<CarouselProps>`
  display: flex;
  width: ${({ carouselWidth = 0 }) => `${carouselWidth}px`};
  min-width: ${({ carouselWidth = 0 }) => `${carouselWidth}px`};
  height: ${CAROUSEL_HEIGHT};
  position: relative;
  animation: ${({ carouselWidth = 0 }) => css`
    ${carouselWidth * 20}ms linear 0s
    infinite normal both running ${marquee(-carouselWidth)}
  `};

  &:hover {
    animation-play-state: paused;
  }
`;

interface CustomerReviewCarouselProps {
  fields: CustomerReviewCarouselType;
}

export const CustomerReviewCarousel: FC<CustomerReviewCarouselProps> = ({
  fields,
}) => {
  const carouselCardRef = useRef<HTMLAnchorElement>(null);
  const [carouselWidth, setCarouselWidth] = useState<number>(0);
  const { reviews, fetchingReviews } = useReviews(fields.feedId);

  useEffect(() => {
    if (reviews && !fetchingReviews) {
      const ITEM_MULTIPLIER = 2;

      const handleCarouselSize = () => {
        if (carouselCardRef.current) {
          setTimeout(() => {
            const items = reviews.length * ITEM_MULTIPLIER;

            const itemWidth = carouselCardRef.current?.offsetWidth ?? 480;

            if (itemWidth) {
              setCarouselWidth((itemWidth * items) / ITEM_MULTIPLIER);
            }
          }, 0);
        }
      };

      handleCarouselSize();

      window.addEventListener("resize", handleCarouselSize);

      return () => window.removeEventListener("resize", handleCarouselSize);
    }
  }, [reviews, fetchingReviews]);

  return (
    <CarouselWrapper>
      {reviews && (
        <Carousel carouselWidth={carouselWidth}>
          {[...reviews, ...reviews].map(
            (review: EmbedSocialReviewType, index: number) => (
              <CustomerReview
                // eslint-disable-next-line react/no-array-index-key
                key={`${review.id}-${index}`}
                index={index}
                review={review}
                ref={carouselCardRef}
              />
            ),
          )}
        </Carousel>
      )}
    </CarouselWrapper>
  );
};

export default CustomerReviewCarousel;
