import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ThunkDispatch } from "redux-thunk";
import { addTodo, getTodos } from "../actions/Todos";
import { Button } from "../styled/ButtonStyled";
import { Loading } from "../styled/LoadingStyled";
import {
  ModalContainer,
  StyledModal,
  ModalBody,
  ModalHeader,
  ModalBodyRow,
  ModalFooter,
} from "../styled/ModalStyled";
import { CloseStyled } from "../styled/IconsStyled";

type Props = {
  open: boolean;
  toggleModal: () => void;
};

const ModalAdd: React.FC<Props> = ({ open, toggleModal }) => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (description: string) => {
    setLoading(true);
    dispatch(addTodo(description))
      .then(() => {
        dispatch(getTodos()).then(() => {
          setLoading(false);
          setDescription("");
          toggleModal();
          toast.success("Todo added successfully!", {
            toastId: "successDelete",
          });
        });
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to add todo!", {
          toastId: "errorDelete",
        });
      });
  };
  return (
    <>
      <StyledModal
        isOpen={open}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <ModalContainer>
          <ModalHeader>
            Add to do
            <CloseStyled onClick={toggleModal} />
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <Loading />
            ) : (
              <ModalBodyRow>
                <div>Description:</div>
                <input
                  type="text"
                  value={description}
                  onChange={(event: React.FormEvent<HTMLInputElement>) => {
                    setDescription(event.currentTarget.value);
                  }}
                />
              </ModalBodyRow>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggleModal}>Close</Button>
            <Button onClick={() => handleSubmit(description)}>
              Save changes
            </Button>
          </ModalFooter>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default ModalAdd;
