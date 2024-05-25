import Home from "./pages/Home"
import Book from "./pages/Book"
import Navbar from "./components/Navbar"
import "./App.css";
import { BrowserRouter, Route, Routes,  } from "react-router-dom"
// import Footer from "./components/Footer";
import TicketCancelingPage from "./pages/TicketCancelingPage";
// import TestPage from "./data/Test";


const App = () => {
  return (
    <div>

      <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/book" element={<Book/>} />
          <Route path="/ticketCancling" element={<TicketCancelingPage/>} />
          {/* <Route path="/test" element={<TestPage />} /> */}
        </Routes>
        {/* <Footer/> */}
      </div>
    </BrowserRouter>

    </div>
  )
}

export default App