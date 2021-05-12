import { FC } from "react";
import { useRouter } from "next/router";
import { Card } from "src/components/Layout";
import {
  PlanCardType,
  PlanRateTypes,
  PlanEnergyTypes,
} from "src/components/PlanCard/PlanCard.interfaces";
import { Bold, H3, P } from "src/components/Typography";
import { Languages } from "src/interfaces/common.interfaces";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import styled, { css } from "styled-components";
import { PlanCalendar } from "src/styles/icons/PlanCalendar.icon";
import { PlanLock } from "src/styles/icons/PlanLock.icon";
import { PlanWindmill } from "src/styles/icons/PlanWindmill.icon";
import { useInterpolateCityData } from "src/hooks/useInterpolateCityData";
import { AnimatedWrapper } from "src/components/AnimatedWrapper/AnimatedWrapper.component";

interface PlanCardProps {
  fields: PlanCardType;
  wait?: number;
  inView: boolean;
}

interface PlanContentProps {
  padding?: boolean;
}

const PlanContent = styled.div<PlanContentProps>`
  padding: 0;

  ${({ padding, theme }) =>
    padding &&
    css`
      padding: ${theme.sizing.main};
    `}
`;

const PlanCardP = styled(P)`
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.font.contentCard.copy.mobile};
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  margin: 0 0 0.75rem;
`;

export const PlanDetail = styled.li`
  color: ${({ theme }) => theme.colors.purple.dark};
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 0 0;

  &:first-child {
    padding: 0;
  }

  svg {
    margin-right: 0.35rem;
  }
`;

const PlanSpecialOffer = styled.div`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.green.main};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 0.9rem;
  font-weight: ${FontWeight.Semibold};
`;

const PlanPricing = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.grey[100]};
  padding: 0.5rem 0 0 0;
  margin-top: 1rem;
  color: inherit;
`;

const PlanPrice = styled(P)`
  font-weight: ${FontWeight.Bold};
  color: ${({ theme }) => theme.colors.purple.dark};
  font-size: 2rem;
  margin-bottom: 0;
`;

const PlanPriceLabel = styled(P)`
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: 0.8rem;
  line-height: 1.35;
  max-width: 20ch;
  margin: 0;
`;

export const PlanCard: FC<PlanCardProps> = ({
  fields,
  wait = 0,
  inView = false,
}) => {
  const { locale } = useRouter();

  const renderRateIcon = (type: PlanRateTypes) => {
    switch (type) {
      case PlanRateTypes.Fixed:
        return <PlanLock />;
    }
  };

  const renderEnergyIcon = (type: PlanEnergyTypes) => {
    switch (type) {
      case PlanEnergyTypes.Wind:
        return <PlanWindmill />;
    }
  };

  const interpolate = useInterpolateCityData();

  return (
    <AnimatedWrapper wait={wait} animate={inView}>
      <Card noPadding={Boolean(fields.planSpecialOffer)}>
        {fields?.planSpecialOffer && (
          <PlanSpecialOffer>
            {fields.planSpecialOffer[locale as Languages]}
          </PlanSpecialOffer>
        )}
        <PlanContent padding={Boolean(fields.planSpecialOffer)}>
          <H3>
            <Bold weight={FontWeight.Bold}>
              {fields.planTitle[locale as Languages]}
            </Bold>
          </H3>
          <PlanCardP>{fields.planDescription[locale as Languages]}</PlanCardP>
          <ul>
            <PlanDetail>
              <PlanCalendar />
              {interpolate(fields.planLength[locale as Languages])}
            </PlanDetail>
            <PlanDetail>
              {renderRateIcon(fields.planRateType)}
              {interpolate(fields.planRate[locale as Languages])}
            </PlanDetail>
            <PlanDetail>
              {renderEnergyIcon(fields.planEnergyType)}
              {interpolate(fields.planEnergy[locale as Languages])}
            </PlanDetail>
          </ul>
          {fields.planPrice && (
            <PlanPricing>
              {fields.planPriceRangeLabel && (
                <PlanPriceLabel>
                  {fields.planPriceRangeLabel[locale as Languages]}
                </PlanPriceLabel>
              )}
              <PlanPrice>{fields.planPrice}</PlanPrice>
              {fields.planPriceLabel && (
                <PlanPriceLabel>
                  {fields.planPriceLabel[locale as Languages]}
                </PlanPriceLabel>
              )}
            </PlanPricing>
          )}
        </PlanContent>
      </Card>
    </AnimatedWrapper>
  );
};

export default PlanCard;
