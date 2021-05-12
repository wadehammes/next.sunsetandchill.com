import styled from "styled-components";
import { P } from "src/components/Typography";

export const SuccessText = styled(P)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3em;

  &:before {
    content: url("data:image/svg+xml;base64,PHN2Zw0KICAgIHdpZHRoPSIxNCINCiAgICBoZWlnaHQ9IjEyIg0KICAgIHZpZXdCb3g9IjAgMCAxNCAxMiINCiAgICBmaWxsPSJub25lIg0KICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgPg0KICAgIDxwYXRoDQogICAgICBmaWxsUnVsZT0iZXZlbm9kZCINCiAgICAgIGNsaXBSdWxlPSJldmVub2RkIg0KICAgICAgZD0iTTE0IDEuNDk0ODhMNS4zODIyNiAxMS4yTDAgNS44NDM2OUwxLjU5MzAyIDQuMjQ3NzFMNS4yODA4NCA3LjkxNzc1TDEyLjMxMTUgMEwxNCAxLjQ5NDg4WiINCiAgICAgIGZpbGw9IiNBNEVCQzQiDQogICAgLz4NCiAgPC9zdmc+");
    display: inline-block;
    padding-right: 0.5em;
  }
`;
