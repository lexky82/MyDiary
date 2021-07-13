import styled from "@emotion/styled";

export const Nav = styled.nav`
  width: 80px;
  position: fixed;
  height: 100vh;
  z-index: 100;
  background-color: #202020;
  box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 768px) {
    bottom: 0;
    width: 100%;
    height: 9%;
  }
`;

export const Ul = styled.ul`
  list-style-type: none;
  color: white;
  &:first-child {
    padding-top: 1.5rem;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-evenly;
  }
`;

export const Li = styled.li`
  padding-bottom: 4rem;
  &:hover a:after {
    opacity: 5;
  }

  @media screen and (max-width: 768px) {
    padding-bottom: 2rem;
  }

  svg {
    width: 1.7rem;
    height: 1.4rem;
    position: relative;
    left: -1.563rem;
    cursor: pointer;

    @media screen and(min-width:768px) {
      width: 1.5rem;
      height: 1.4rem;
      left: -15px;
    }
  }
`;
