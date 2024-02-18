import "../src/styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast,Bounce } from "react-toastify";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NoticePage from "./pages/NoticePage";
import ActivationPage from "./pages/ActivationPage";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="notice/list" element={<NoticePage />} />
          <Route
            path="/v1/notices/list"
            element={<ActivationPage />}
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
          transition={Bounce}
        />
      </BrowserRouter>
    </>
  );
};

export default App;
