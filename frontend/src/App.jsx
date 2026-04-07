import './App.css'
import BrownButton from "./components/buttons/BrownButton.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <>
        <Navbar />
        <div className=" mt-50 mb-50 bg-[#583927]">
        <h1 className="relieve-font text-[#FAF3E8]">Grow Your</h1>
            <h1 className="relieve-font text-[#FAF3E8]">Career</h1>
        </div>
        <Footer />
    </>
  )
}

export default App
