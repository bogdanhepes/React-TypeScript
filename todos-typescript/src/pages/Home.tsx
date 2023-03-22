import { Container } from "../styled/ContainerStyled";
import { Navbar } from "../styled/NavbarStyled";
import { Button } from "../styled/ButtonStyled";
import { useEffect, useState } from "react";
import {
  DropdownContainer,
  DropdownHeader,
  DropdownList,
  ListItem,
} from "../styled/DropdownStyled";
import { Loading } from "../styled/LoadingStyled";
import Table from "../components/Table";
import { getTodos } from "../actions/Todos";
import { useDispatch } from "react-redux";
import ModalAdd from "../components/ModalAdd";
import { toast } from "react-toastify";
import { ThunkDispatch } from "redux-thunk";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggling = () => setIsOpen(!isOpen);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(getTodos())
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        toast.error("Failed to load data!", { toastId: "errorUserLoad" });
      });
    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <Navbar>
        ToDoLIST
        <DropdownContainer>
          <DropdownHeader onClick={toggling}>User</DropdownHeader>
          {isOpen && (
            <DropdownContainer>
              <DropdownList>
                <ListItem>Profile</ListItem>
                <ListItem>LogOut</ListItem>
              </DropdownList>
            </DropdownContainer>
          )}
        </DropdownContainer>
      </Navbar>
      <Container>
        <Button onClick={toggleModal}>+ Add a to do</Button>
        {isLoading ? <Loading /> : <Table />}
      </Container>
      <ModalAdd open={open} toggleModal={toggleModal} />
    </>
  );
};

export default Home;
