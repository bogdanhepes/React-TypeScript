import styled, { css } from "styled-components";

export const Tablee = styled.table`
  text-align: center;
  margin: 100px auto;
  width: 100%;
  border: solid 2px;
  border-collapse: collapse;
`;
export const TableHead = styled.thead``;
export const TableHeader = styled.th<{ width?: string }>`
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}

  border: solid 2px black;
  padding: 7px;
  color: white;
  background-color: rgb(33, 33, 33);
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr``;

export const TableCell = styled.td`
  padding: 7px;
  border: solid 2px;

  font-weight: 500;
`;
