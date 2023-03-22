import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./styled/Global";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { ModalProvider } from "styled-react-modal";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
    <ToastContainer autoClose={3000} limit={1} />
  </>
);
