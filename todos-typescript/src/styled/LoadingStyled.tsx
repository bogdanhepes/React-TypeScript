import styled from "styled-components";

export const Loading = styled.div`
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  border-radius: 50%;
  border: 7px solid black;
  border-right: 7px solid grey;

  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
