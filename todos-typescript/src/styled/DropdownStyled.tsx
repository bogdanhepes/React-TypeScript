import styled from "styled-components";

export const DropdownContainer = styled("div")`
  width: 100px;
  margin 0;
`;

export const DropdownHeader = styled("div")`
  padding: 5px;

  text-align: center;

  font-weight: 500;
  font-size: 17px;

  cursor: pointer;

  color: white;
  background: rgb(33, 33, 33);
`;

export const DropdownList = styled("ul")`
  position: absolute;
  margin: 0;
  padding: 0 5px;

  width: 100px;

  border-top: 1px solid lightgrey;

  background: rgb(33, 33, 33);

  box-sizing: border-box;

  color: white;
  font-size: 15px;
  font-weight: 500;
  text-align: center;

  &:first-child {
    padding-top: 10px;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 10px;
`;
