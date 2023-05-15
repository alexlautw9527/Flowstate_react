import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainTodo from "@pages/MainTodo";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainTodo />} />
        <Route path="sign_up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
