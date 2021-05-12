import { Children, forwardRef } from "react";
import styled from "styled-components";
import { device, contentfulColorMapping } from "src/styles/theme";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import { ContentfulColors } from "src/interfaces/common.interfaces";
import { useInterpolateCityData } from "src/hooks/useInterpolateCityData";
import { useInterpolateMisspelling } from "src/hooks/useInterpolateMisspellings";

interface TypeProps {
  color?: ContentfulColors | undefined;
}

export function makeComponent<T>(
  Component: React.ElementType,
): React.FC<React.HTMLAttributes<T>> {
  return ({ children, ...rest }) => {
    const parseCityData = useInterpolateCityData();
    const parseMisspellings = useInterpolateMisspelling();

    return (
      <Component {...rest}>
        {Children.map(children, (child) =>
          typeof child === "string"
            ? parseCityData(parseMisspellings(child))
            : child,
        )}
      </Component>
    );
  };
}

export function makeAComponent<T>(
  Component: React.ElementType,
): React.FC<React.AnchorHTMLAttributes<T>> {
  return forwardRef(({ children, ...rest }, ref) => {
    const parseCityData = useInterpolateCityData();
    const parseMisspellings = useInterpolateMisspelling();

    return (
      <Component {...rest} ref={ref}>
        {Children.map(children, (child) =>
          typeof child === "string"
            ? parseCityData(parseMisspellings(child))
            : child,
        )}
      </Component>
    );
  });
}

export const H1 = styled(makeComponent("h1"))<TypeProps>`
  display: block;
  font-size: ${({ theme }) => theme.font.h1.mobile};
  font-weight: ${({ theme }) => theme.font.h1.fontWeight};
  line-height: ${({ theme }) => theme.font.h1.lineHeight};
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.primary.main};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.font.h1.tablet};
  }
`;

export const H2 = styled(makeComponent("h2"))<TypeProps>`
  display: block;
  font-size: ${({ theme }) => theme.font.h2.mobile};
  font-weight: ${({ theme }) => theme.font.h2.fontWeight};
  line-height: ${({ theme }) => theme.font.h2.lineHeight};
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.primary.main};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.font.h2.tablet};
  }
`;

export const H3 = styled(makeComponent("h3"))<TypeProps>`
  display: block;
  font-size: ${({ theme }) => theme.font.h3.mobile};
  font-weight: ${({ theme }) => theme.font.h3.fontWeight};
  line-height: 1.25;
  letter-spacing: ${({ theme }) => theme.font.h3.letterSpacing};
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.black};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.font.h3.tablet};
  }
`;

export const H4 = styled(makeComponent("h4"))<TypeProps>`
  display: block;
  font-size: ${({ theme }) => theme.font.h4.mobile};
  font-weight: ${({ theme }) => theme.font.h4.fontWeight};
  line-height: ${({ theme }) => theme.font.h4.lineHeight};
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.black};
`;

export const P = styled(makeComponent("p"))<TypeProps>`
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.purple.dark};
  display: block;
  font-size: ${({ theme }) => theme.font.p.mobile};
  font-weight: ${({ theme }) => theme.font.p.fontWeight};
  line-height: ${({ theme }) => theme.font.p.lineHeight};
  margin: 0 0 1.5rem 0;

  &:last-child {
    margin-bottom: 0;
  }

  @media ${device.laptop} {
    font-size: ${({ theme }) => theme.font.p.tablet};
  }
`;

export const UL = styled(makeComponent("ul"))<TypeProps>`
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.black};
  display: block;
  list-style-type: disc;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
  margin-left: 0;
  margin-right: 0;
  padding-left: 3rem;
`;

export const OL = styled(makeComponent("ol"))<TypeProps>`
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.black};
  display: block;
  list-style-type: decimal;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
  margin-left: 0;
  margin-right: 0;
  padding-left: 3rem;
`;

export const CircledNumberOL = styled(makeComponent("ol"))<TypeProps>`
  list-style: none;
  counter-reset: circledNumbers;

  li {
    display: flex;
    color: inherit;
    align-items: flex-start;
    counter-increment: circledNumbers;
    padding: 0 0 2.5rem 5rem;
    position: relative;

    &:before {
      content: counter(circledNumbers);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      background-color: ${({ theme }) => theme.colors.purple.main};
      padding: 0.25rem;
      min-width: 3.5rem;
      min-height: 3.5rem;
      border-radius: 1000px;
      transform: translateY(-0.75rem);
      text-align: center;
      text-shadow: 2px 1px 0 ${({ theme }) => theme.colors.purple.variants.neon};
      font-size: 2rem;
      line-height: 1;
      font-weight: ${FontWeight.Bold};

      > * {
        margin: auto;
      }
    }
  }
`;

export const LI = styled(makeComponent("li"))<TypeProps>`
  margin: 0 0 0.5em 0;
`;

export const PrettyUL = styled(makeComponent("ul"))<TypeProps>`
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.black};
  display: block;
  padding: 0.75em 0 0 0;
  margin: 0;
  list-style: none;
  font-size: inherit;
  font-weight: ${FontWeight.Regular};

  @media ${device.mobileL} {
    padding: 0.75em 0 0 26px;
  }
`;

export const PrettyLI = styled(makeComponent("li"))<TypeProps>`
  display: flex;
  position: relative;
  margin: 0 0 1rem 0;
  line-height: 1.5;
  padding-left: 1.5em;
  font-size: inherit;

  &:before {
    content: url("data:image/svg+xml;base64,PHN2Zw0KICAgIHdpZHRoPSIxNCINCiAgICBoZWlnaHQ9IjEyIg0KICAgIHZpZXdCb3g9IjAgMCAxNCAxMiINCiAgICBmaWxsPSJub25lIg0KICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgPg0KICAgIDxwYXRoDQogICAgICBmaWxsUnVsZT0iZXZlbm9kZCINCiAgICAgIGNsaXBSdWxlPSJldmVub2RkIg0KICAgICAgZD0iTTE0IDEuNDk0ODhMNS4zODIyNiAxMS4yTDAgNS44NDM2OUwxLjU5MzAyIDQuMjQ3NzFMNS4yODA4NCA3LjkxNzc1TDEyLjMxMTUgMEwxNCAxLjQ5NDg4WiINCiAgICAgIGZpbGw9IiNBNEVCQzQiDQogICAgLz4NCiAgPC9zdmc+");
    position: absolute;
    left: 0;
    transform: translateY(2px);
    color: ${({ theme }) => theme.colors.green[300]};
  }
`;

export const A = styled(makeAComponent<HTMLAnchorElement>("a"))<TypeProps>`
  color: ${({ theme, color }) =>
    color ? contentfulColorMapping[color] : theme.colors.purple.dark};
  font-size: inherit;

  &.whiteLink:hover {
    text-decoration: underline;
  }

  &:hover {
    cursor: pointer;
    color: ${({ theme, color }) =>
      color ? contentfulColorMapping[color] : theme.colors.purple.dark};
  }

  &:visited {
    color: ${({ theme, color }) =>
      color ? contentfulColorMapping[color] : "inherit"};
  }
`;

interface BoldProps {
  weight?: FontWeight.Semibold | FontWeight.Bold;
}

export const Bold = styled(makeComponent("strong"))<BoldProps>`
  font-weight: ${({ weight }) => weight || FontWeight.Semibold};
`;

export const HR = styled.hr`
  box-shadow: 0;
  border: 1px solid ${({ theme }) => theme.colors.purple.light};
  margin: ${({ theme }) => theme.sizing.main} 0;
`;

export const Blockquote = styled.blockquote`
  padding: 0 0 0 ${({ theme }) => theme.sizing.small};
  margin: ${({ theme }) => theme.sizing.main} 0;
  border-left: 5px solid ${({ theme }) => theme.colors.purple.light};
`;

export const Span = styled(makeComponent("span"))``;
