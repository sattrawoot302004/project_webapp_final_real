
import Image from "next/image";
import Navbar from "./components/Navbar.jsx";
import Chat from './components/Chat.jsx'
import ChatPage from "./components/Chatpage.jsx";
import Homepage from "./components/Homepage.jsx";
import Welcomepage from "./welcome/page.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <>
     <Welcomepage/>
    </>
  );
}
