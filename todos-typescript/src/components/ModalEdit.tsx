import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThunkDispatch } from "redux-thunk";
import { getTodos, updateTodo } from "../actions/Todos";
import { RootState } from "../redux/reducers/RootReducer";
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
  loading: boolean;
  setLoading: (parameter: boolean) => void;
};

const ModalEdit: React.FC<Props> = ({
  open,
  toggleModal,
  loading,
  setLoading,
}) => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();

  const { todo } = useSelector((state: RootState) => state.Todos);
  const [description, setDescription] = useState<string>(todo.description);
  const [status, setStatus] = useState<boolean>(todo.status);

  useEffect(() => {
    setDescription(todo.description);
    setStatus(todo.status);
  }, [todo]);

  const handleSubmit = (id: number, description: string, status: boolean) => {
    setLoading(true);
    dispatch(updateTodo(id, { description, status }))
      .then(() => {
        dispatch(getTodos()).then(() => {
          setLoading(false);
          toggleModal();
          toast.success("Todo edited successfully!", {
            toastId: "successDelete",
          });
        });
      })
      .catch(() => {
        setLoading(false);

        toast.error("Failed to edit todo!", {
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
            Edit to do
            <CloseStyled onClick={toggleModal} />
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <Loading />
            ) : (
              <>
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
                <ModalBodyRow>
                  <div>Mark task as completed:</div>
                  <input
                    type="checkbox"
                    checked={status}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      setStatus(event.currentTarget.checked);
                    }}
                  />
                </ModalBodyRow>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggleModal}>Close</Button>
            <Button onClick={() => handleSubmit(todo.id, description, status)}>
              Save changes
            </Button>
          </ModalFooter>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default ModalEdit;
