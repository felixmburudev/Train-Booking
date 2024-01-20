
import Footer from './footer/Footer';
import Header from './header/Header'
// import Navbar from './navbar/Navbar';
import Stations from "./stations/stations";
import Turminus from './turminus/Turminus';
import Featured from './whyUse/Featured';

function Home () {
  return (
    <div>
    {/* <Navbar/> */}
    <Header/>
    <Stations/>
    <Featured/>
    <Turminus/>
    <Footer/>

    </div>
  )
}
export default Home;