import styled from "@emotion/styled";

export const Nav = styled.nav`
  width: 80px;
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 100;
  background-color: #202020;
  box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 768px) {
    width: 60px;
  }
`;

export const Ul = styled.ul`
  list-style-type: none;
  color: white;
  &:first-child {
    padding-top: 1.5rem;
  }
`;

export const Li = styled.div`
  padding-bottom: 4rem;

  &:hover a:after {
    opacity: 5;
  }

  @media screen and (max-width: 768px) {
    padding-bottom: 2rem;
  }

  svg {
    width: 26px;
    height: 26px;
    position: relative;
    left: -25px;
    cursor: pointer;
    @media screen and(min-width:768px) {
      width: 32px;
      height: 32px;
      left: -15px;
    }
  }
`;
