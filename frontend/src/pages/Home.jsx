
import Footer from '../components/Footer';
import Header from '../components/Header'
// import Navbar from './navbar/Navbar';
import Stations from "./stations";
import Turminus from './Turminus';
import Featured from './Featured';
// import TestPage from '../data/Test';

function Home () {
  return (
    <div>
    {/* <Navbar/> */}
    <Header/>
    <Stations/>
    <Featured/>
    <Turminus/>
    {/* <TestPage trainName={"3/10/2024-city2-Express"}/> */}
    <Footer/>

    </div>
  )
}
export default Home;