import { FC, ReactElement, ReactNode } from "react";
import {
  H2,
  H3,
  H4,
  A,
  P,
  Bold,
  UL,
  OL,
  HR,
  LI,
  CircledNumberOL,
} from "src/components/Typography";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { RichTextType } from "src/components/RichText/RichText.interfaces";
import {
  ContentfulColors,
  Languages,
  Alignment,
  OrderedListTypes,
} from "src/interfaces/common.interfaces";
import { appendUrlParams } from "src/utils/helpers";
import { useQueryParamString } from "src/hooks/useQueryParamString";

interface RichTextProps {
  fields: RichTextType;
}

interface RichTextContainerProps {
  align?: Alignment;
}

const RichTextContainer = styled.div<RichTextContainerProps>`
  max-width: 70ch;
  width: 100%;
  margin: 0 auto;
  word-break: break-word;

  ${({ align }) =>
    align === Alignment.Left &&
    css`
      margin: 0;
      max-width: 100%;
    `}

  ${A} {
    text-decoration: underline;
  }
`;

export const RichText: FC<RichTextProps> = ({ fields }): ReactElement => {
  const { locale } = useRouter();
  const { queryParamString } = useQueryParamString();

  const orderedListType = (children: ReactNode) => {
    switch (fields?.orderedListStyle) {
      case OrderedListTypes.CircledNumbers:
        return <CircledNumberOL>{children}</CircledNumberOL>;
      case OrderedListTypes.Regular:
      default:
        return <OL>{children}</OL>;
    }
  };

  const richTextParsing: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <H2 color={ContentfulColors.HeadlinePurple}>{children}</H2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <H3 style={{ margin: "0 0 0.5em 0" }}>{children}</H3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <H4 style={{ margin: "0 0 0.5em 0" }}>{children}</H4>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => <P>{children}</P>,
      [BLOCKS.HR]: (node) => <HR />,
      [INLINES.HYPERLINK]: (node, children) => (
        <A
          href={appendUrlParams(node.data.uri, queryParamString)}
          color={ContentfulColors.Purple}
        >
          {children}
        </A>
      ),
      [BLOCKS.UL_LIST]: (node, children) => <UL>{children}</UL>,
      [BLOCKS.OL_LIST]: (node, children) => orderedListType(children),
      [BLOCKS.LIST_ITEM]: (node, children) => <LI>{children}</LI>,
    },
  };

  return (
    <RichTextContainer align={fields?.copyAlignment}>
      {documentToReactComponents(
        fields.copy[locale as Languages],
        richTextParsing,
      )}
    </RichTextContainer>
  );
};

export default RichText;
