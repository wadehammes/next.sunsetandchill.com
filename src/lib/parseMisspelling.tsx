import React from "react";
import styled from "styled-components";

export const Misspelling = styled.span`
  display: inline-block;
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: ${({ theme }) => theme.colors.red.main};
  letter-spacing: -1px;
`;

export const parseMisspelling = (text: string | undefined) => {
  if (!text) {
    return [];
  }

  const replaceFn = (substring: string) => (
    <Misspelling>{substring}</Misspelling>
  );

  const re = new RegExp(/~~ *(.+?) *~~/g);

  const pieces = text.split(re);

  const translated = pieces.map((piece, index) => {
    if (index % 2 === 0) {
      return piece;
    } else {
      return replaceFn(piece);
    }
  });

  return translated.filter((x) => x) || [];
};
