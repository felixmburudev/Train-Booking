
import Footer from '../components/Footer';
import Header from '../components/Header'
// import Navbar from './navbar/Navbar';
import Stations from "./stations";
import Turminus from './Turminus';
import Featured from './Featured';

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