import styled from "@emotion/styled";

export const SearchBox = styled.input`
    box-sizing: border-box;
    border: 1px solid transparent;
    width: 15rem;
    height: 2rem;
    padding: 0 0.75rem;
    border-radius: 0.188rem;
    box-shadow: 0 0.125px 0.375px rgba(0, 0, 0, 0.3);
    font-size: 0.875rem;
    outline: none;
    text-overflow: ellipses;
    position: absolute;
    left: 50%;
    margin-left: -7.5rem;
`;