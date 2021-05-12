import { FC } from "react";
import { useRouter } from "next/router";
import { InView } from "react-intersection-observer";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import { Check } from "src/styles/icons/Check.icon";
import { X } from "src/styles/icons/X.icon";
import { contentfulColorMapping, device } from "src/styles/theme";
import styled, { css } from "styled-components";
import {
  ComparisonTableProps,
  TableCellProps,
  TableCellVariants,
} from "src/components/ComparisonTable/ComparisonTable.interfaces";
import {
  ContentfulColors,
  FontStyle,
  Languages,
} from "src/interfaces/common.interfaces";
import { P } from "src/components/Typography";

interface TableStyleProps {
  relativeWidth?: boolean;
}

const TableWrapper = styled.div<TableStyleProps>`
  width: ${({ theme }) => `calc(100% + ${theme.sizing.large} + 1rem + 2px)`};
  margin: 0 0 0 calc(-1em + 2px);

  ${({ relativeWidth }) =>
    relativeWidth &&
    css`
      width: 100% !important;
      margin: 0 !important;
    `}

  @media ${device.laptop} {
    width: 100%;
    max-width: 60em;
    margin: 0 auto;
  }
`;

const Table = styled.div`
  background-image: ${({ theme }) => theme.colors.purpleGradientReversed};
  width: 100%;
  padding: 1px 1px 0 1px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 6em 6em;
  background-color: transparent;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: 1fr 12em 12em;
  }
`;

const TableCell = styled.div<TableCellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ backgroundColor = ContentfulColors.LightPurple }) =>
    contentfulColorMapping[backgroundColor]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.main};
  padding: 1rem 1.75rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 1rem;
  line-height: 1.2;
  text-align: center;
  min-height: 5rem;

  @media ${device.tablet} {
    font-size: 1.125rem;
  }

  ${({ noBorder }) =>
    noBorder &&
    css`
      border-color: transparent;
    `}

  ${({ noBackground }) =>
    noBackground &&
    css`
      background-color: transparent;
      border-color: transparent;
    `};

  ${({ variant, theme }) =>
    variant === TableCellVariants.Rhythm &&
    css`
      color: ${theme.colors.green.main};
      font-size: 1.175em;
      font-weight: ${FontWeight.Bold};
      background-color: ${contentfulColorMapping.PurpleGradientReversed};
      border-color: ${contentfulColorMapping.PurpleGradientReversed};
      margin-bottom: "-1px";

      @media ${device.tablet} {
        font-size: 1.375em;
      }
    `}

  ${({ cellColor }) =>
    cellColor &&
    css`
      color: ${contentfulColorMapping[cellColor]};
    `}

  ${({ cellFontStyle }) =>
    cellFontStyle &&
    cellFontStyle === FontStyle.Bold &&
    css`
      font-weight: ${FontWeight.Semibold};
    `}
`;

const Sublabel = styled(P)`
  font-size: 0.75rem;
  padding-top: 0.5rem;
`;

interface IconProps {
  wait?: number;
  animate?: boolean;
}

const Icon = styled.div<IconProps>`
  opacity: 0;
  transform: scale(1.3);
  transition: all 0.2s cubic-bezier(0.55, 0.17, 0.32, 1.58);
  transition-delay: ${({ wait = 1 }) => `${wait * 300}ms`};

  ${({ animate }) =>
    animate &&
    css`
      opacity: 1;
      transform: scale(1);
    `}
`;

const Footnote = styled(P)`
  padding: 0.75rem 2rem 0;
  font-size: 0.9rem;

  @media ${device.tablet} {
    padding: 0.75rem 0 0 0;
  }
`;

export const ComparisonTable: FC<ComparisonTableProps> = ({
  rows,
  tableId = "",
  className = "",
  relativeWidth = false,
}) => {
  const { locale } = useRouter();

  const renderIcon = (type: boolean) => (type ? <Check /> : <X />);

  return rows ? (
    <InView threshold={0.25} triggerOnce>
      {({ inView, ref }) => (
        <TableWrapper
          ref={ref}
          id={tableId}
          className={className}
          relativeWidth={relativeWidth}
        >
          <TableRow style={{ padding: "0 1px" }}>
            <TableCell
              backgroundColor={ContentfulColors.Transparent}
              noBorder
            />
            <TableCell
              noBorder
              backgroundColor={ContentfulColors.Transparent}
              variant={TableCellVariants.Rhythm}
            >
              {rows.rhythmColumnHeader[locale as Languages]}
            </TableCell>
            <TableCell
              backgroundColor={ContentfulColors.Transparent}
              noBorder
              style={{ color: contentfulColorMapping.Black }}
            >
              {rows.othersColumnHeader[locale as Languages]}
            </TableCell>
          </TableRow>
          <Table>
            {rows.tableRows.map((row, index: number) => (
              <TableRow key={row.id}>
                <TableCell
                  cellFontStyle={row.labelStyle}
                  backgroundColor={rows.tableCellBackgroundColor}
                >
                  {row.label[locale as Languages]}
                  {row.secondaryLabel && (
                    <Sublabel>
                      {row.secondaryLabel[locale as Languages]}
                    </Sublabel>
                  )}
                </TableCell>
                <TableCell
                  cellColor={row.rhythmColumnValueColor}
                  cellFontStyle={row.labelStyle}
                  noBackground
                >
                  {row.rhythmColumnValue[locale as Languages] ? (
                    row.rhythmColumnValue[locale as Languages]
                  ) : (
                    <Icon wait={index} animate={inView}>
                      {renderIcon(row.rhythmColumn)}
                    </Icon>
                  )}
                </TableCell>
                <TableCell
                  cellColor={row.othersColumnValueColor}
                  cellFontStyle={row.labelStyle}
                  backgroundColor={rows.tableCellBackgroundColor}
                >
                  {row.othersColumnValue[locale as Languages]
                    ? row.othersColumnValue[locale as Languages]
                    : renderIcon(row.othersColumn)}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          {rows.tableFootnote && (
            <Footnote color={ContentfulColors.DarkPurple}>
              {rows.tableFootnote[locale as Languages]}
            </Footnote>
          )}
        </TableWrapper>
      )}
    </InView>
  ) : null;
};

export default ComparisonTable;
