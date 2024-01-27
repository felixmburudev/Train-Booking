import Home from "./pages/Home"
import Book from "./pages/Book"
import Navbar from "./components/Navbar"
import "./App.css";
import { BrowserRouter, Route, Routes,  } from "react-router-dom"


const App = () => {
  return (
    <div>

      <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/book" element={<Book/>} />
        </Routes>
      </div>
    </BrowserRouter>

    </div>
  )
}

export default App