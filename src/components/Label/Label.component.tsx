import { ContentfulColors } from "src/interfaces/common.interfaces";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import { contentfulColorMapping } from "src/styles/theme";
import styled from "styled-components";

interface LabelProps {
  labelColor?: ContentfulColors;
  fontWeight?: FontWeight;
}

export const Label = styled.label<LabelProps>`
  font-size: 0.9em;
  font-weight: ${({ fontWeight }) => fontWeight || FontWeight.Semibold};
  color: ${({ theme, labelColor }) =>
    labelColor ? contentfulColorMapping[labelColor] : theme.colors.grey[500]};
`;
