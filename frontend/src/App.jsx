import Home from "./pages/Home"
import Book from "./pages/Book"
import Navbar from "./components/Navbar"
import "./App.css";
import { BrowserRouter, Route, Routes,  } from "react-router-dom"
import TestPage from "./data/Test";


const App = () => {
  return (
    <div>

      <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/book" element={<Book/>} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </BrowserRouter>

    </div>
  )
}

export default App