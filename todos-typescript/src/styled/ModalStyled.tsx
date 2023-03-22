import styled from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`

border-radius:10px;
background-color:white;
`;

export const ModalContainer = styled.div`
  padding: 15px 35px 20px 35px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 50px;

  font-weight: 600;
  font-size: 30px;
`;

export const ModalBody = styled.div``;

export const ModalBodyRow = styled.div`
  display: flex;
  div {
    padding-right: 20px;
    font-size: 20px;
    font-weight: 500;
  }
`;

export const ModalFooter = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: space-between;
`;
