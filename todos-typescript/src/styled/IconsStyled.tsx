import styled from "styled-components";
import { EditOutline } from "@styled-icons/evaicons-outline/EditOutline";
import { DeleteOutline } from "@styled-icons/material/DeleteOutline";
import { CheckSquare } from "@styled-icons/bootstrap/CheckSquare";
import { XCircle } from "@styled-icons/bootstrap/XCircle";
import { ExpandOutline } from "@styled-icons/evaicons-outline/ExpandOutline";
import { CollapseOutline } from "@styled-icons/evaicons-outline/CollapseOutline";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
import { UpArrow } from "@styled-icons/boxicons-solid/UpArrow";
import { Close } from "@styled-icons/ionicons-outline/Close";

export const CloseStyled = styled(Close)`
  width: 30px;
  cursor: pointer;
`;

export const EditStyled = styled(EditOutline)`
  color: #0d6efd;
  width: 30px;
  cursor: pointer;
`;
export const DeleteStyled = styled(DeleteOutline)`
  color: #212529;
  width: 30px;
  cursor: pointer;
`;
export const CheckStyled = styled(CheckSquare)`
  color: #198754;
  width: 30px;
`;
export const XStyled = styled(XCircle)`
  color: #dc3545;
  width: 30px;
`;
export const ExpandStyled = styled(ExpandOutline)`
  width: 30px;
  cursor: pointer;
`;
export const CollapseStyled = styled(CollapseOutline)`
  width: 30px;
  cursor: pointer;
`;
export const AscStyled = styled(UpArrow)`
  padding-left: 10px;
  width: 15px;
`;
export const DescStyled = styled(DownArrow)`
  padding-left: 10px;
  width: 15px;
`;
