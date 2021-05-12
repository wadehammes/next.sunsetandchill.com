import { FC, forwardRef, ReactElement, Ref } from "react";
import { Card } from "src/components/Layout";
import styled, { css } from "styled-components";
import { dateOptions, isEven, isOdd } from "src/utils/helpers";
import {
  EmbedSocialReviewType,
  ReviewSourceType,
} from "src/components/CustomerReviewCarousel/CustomerReviewCarousel.interfaces";
import { Star } from "src/styles/icons/Star.icon";
import { FacebookRound } from "src/styles/icons/FacebookRound.icon";
import { Google } from "src/styles/icons/Google.icon";
import { useRouter } from "next/router";
import { FontWeight } from "src/styles/enums/FontWeight.enum";

const CardWrapper = styled.a`
  padding: 0 ${({ theme }) => theme.sizing.small};
  display: flex;
  align-items: stretch;
  height: 100%;
  min-width: 24em;
  width: 24em;
  max-width: 100%;
  box-sizing: content-box;
  transform: scale(1);
  transition: transform 0.15s ease-in;

  &:hover {
    transform: scale(1.035);
  }

  &:hover:active {
    transform: scale(1.025);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 ${({ theme }) => theme.sizing.small} 0;
`;

interface HeadshotProps {
  bgIndex: number;
}

const Headshot = styled.div<HeadshotProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75em;
  width: 2.75em;
  border-radius: 1000px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${FontWeight.Regular};

  > span {
    font-size: 1.25rem;
    margin: auto;
  }

  ${({ bgIndex, theme }) =>
    bgIndex &&
    isEven(bgIndex) &&
    css`
      background-color: ${theme.colors.purple.variants.brighter};
    `}

  ${({ bgIndex, theme }) =>
    bgIndex &&
    isOdd(bgIndex) &&
    css`
      background-color: ${theme.colors.purple.variants.neon};
    `}
`;

const Name = styled.p`
  font-size: ${({ theme }) => theme.font.userReviews.userName.tablet};
  font-weight: ${({ theme }) => theme.font.userReviews.userName.fontWeight};
  line-height: ${({ theme }) => theme.font.userReviews.userName.lineHeight};
  color: ${({ theme }) => theme.colors.black};
  margin: 0 0 0 ${({ theme }) => theme.sizing.small};
`;

const Review = styled.p`
  font-size: ${({ theme }) => theme.font.userReviews.userReview.tablet};
  font-weight: ${({ theme }) => theme.font.userReviews.userReview.fontWeight};
  line-height: ${({ theme }) => theme.font.userReviews.userReview.lineHeight};
  color: ${({ theme }) => theme.colors.black};
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 1em 0;

  > svg {
    margin-right: 0.25em;
  }
`;

const Meta = styled.div`
  padding: ${({ theme }) => theme.sizing.small} 0 0 0;
  display: flex;
  align-items: center;
`;

const SVG_SIZE = "1.5em";

const SourceIcon = styled.div`
  height: ${SVG_SIZE};
  width: ${SVG_SIZE};

  > svg {
    height: ${SVG_SIZE};
    width: ${SVG_SIZE};
  }
`;

const CreatedOn = styled.time`
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: 0.9em;
  padding-left: 1em;
`;

interface CustomerReviewProps {
  review: EmbedSocialReviewType;
  index: number;
  ref?: Ref<HTMLAnchorElement>;
}

export const CustomerReview: FC<CustomerReviewProps> = forwardRef(
  ({ review, index }, cardRef: Ref<HTMLAnchorElement>): ReactElement => {
    const { locale } = useRouter();
    const renderSource = (source: ReviewSourceType) => {
      switch (source) {
        case ReviewSourceType.Facebook:
          return {
            icon: <FacebookRound />,
            url: "https://www.facebook.com/102324644677223/reviews",
            label: "Facebook Reviews",
          };
        case ReviewSourceType.Google:
          return {
            icon: <Google />,
            url: `https://www.google.com/maps/place/Rhythm/@29.730219,-95.4430063,17z/data=!4m7!3m6!1s0x8640c1e950172c9b:0x77e07ada0facfa26!8m2!3d29.7302177!4d-95.4404452!9m1!1b1?hl=${locale}`,
            label: "Google Place Reviews",
          };
        default:
          return {
            icon: null,
            url: "https://embedsocial.com/reviews/rhythm",
            label: "Rhythm Review on Embed Social",
          };
      }
    };

    return (
      <CardWrapper
        className="carouselReviewCard"
        itemProp="review"
        itemScope
        itemType="https://schema.org/Review"
        href={renderSource(review.source_type).url}
        target="_blank"
        rel="noreferrer"
        aria-label={renderSource(review.source_type).label}
        ref={cardRef}
      >
        <Card isCarouselItem>
          <CardHeader>
            <Headshot bgIndex={index}>
              <span>{review.reviewer_name.charAt(0)}</span>
            </Headshot>
            <Name>{review.reviewer_name}</Name>
          </CardHeader>
          <StarRating
            itemProp="reviewRating"
            itemScope
            itemType="https://schema.org/Rating"
          >
            {[...new Array(review.review_rating)].map((_, i: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Star key={`star-${i}`} />
            ))}
            <meta itemProp="worstRating" content="1" />
            <span itemProp="ratingValue" hidden>
              {review.review_rating}
            </span>
            <span itemProp="bestRating" hidden>
              5
            </span>
          </StarRating>
          <Review itemProp="reviewBody">{review.review_text}</Review>
          <Meta>
            {renderSource(review.source_type).icon && (
              <SourceIcon>{renderSource(review.source_type).icon}</SourceIcon>
            )}
            <CreatedOn dateTime={review.created_on}>
              {new Date(review.created_on).toLocaleString(locale, dateOptions)}
            </CreatedOn>
            <meta itemProp="datePublished" content={review.created_on} />
            <span hidden itemProp="itemReviewed">
              Rhythm Ops, LLC d/b/a Rhythm
            </span>
          </Meta>
        </Card>
      </CardWrapper>
    );
  },
);
