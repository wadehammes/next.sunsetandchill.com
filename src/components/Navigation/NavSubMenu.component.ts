import styled from "styled-components";

export const NavSubMenu = styled.div`
  position: absolute;
  display: flex;
  top: 100%;
  left: 0;
  width: 175%;
  padding-top: 1em;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
`;

export default NavSubMenu;
