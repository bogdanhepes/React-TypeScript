import styled from "styled-components";

export const Button = styled("button")`
  padding: 3px 10px;

  border: solid rgb(33, 33, 33);
  border-width: 1.5px;
  border-radius: 5px;

  background-color: transparent;
  color: rgb(33, 33, 33);

  font-size: 20px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
