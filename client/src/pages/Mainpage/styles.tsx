import styled from "@emotion/styled";

export const RenderChart = styled.div`
  display: flex;
  width:20rem;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Container = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const SectionTitle = styled.div`
  padding: 0px 1.25rem 1.25rem 1.25rem; 
  font-size: 1.375rem;
  font-weight: 700;
`;
