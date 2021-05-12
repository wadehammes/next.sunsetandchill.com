import styled from "styled-components";
import { FC } from "react";
import { MobileNavClose } from "src/styles/icons/MobileNavClose.icon";

const Alert = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.purple.main};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.75em 1.5em;
  text-align: center;
  z-index: 99;

  span:last-child {
    flex: 1;
    text-align: right;
  }
`;

const Close = styled.span`
  transform: translateY(-0.25em);

  a {
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &:hover {
      color: ${({ theme }) => theme.colors.logo};
    }
  }

  svg {
    height: 1.5em;
    width: 1.5em;
    margin-left: 0.5em;
  }
`;

const Title = styled.b`
  display: inline-block;
  margin-right: 1rem;
`;

export const PreviewAlert: FC = () => (
  <Alert>
    <Title>You are in Preview Mode.</Title>To share with others, just copy the
    url above and share.
    <Close>
      <a href="/api/exit-preview">
        Exit Preview Mode <MobileNavClose />
      </a>
    </Close>
  </Alert>
);

export default PreviewAlert;
