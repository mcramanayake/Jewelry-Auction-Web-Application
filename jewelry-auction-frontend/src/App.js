import './App.css';
import SellWithUs from "./components/SellWithUs&ContactUs&AboutUs/SellWithUs";
import Contact from "./components/SellWithUs&ContactUs&AboutUs/Contact";
import AboutUs from "./components/SellWithUs&ContactUs&AboutUs/AboutUs";

function App() {
  return (
    <div className="App">
      <AboutUs />
      <Contact />
      <SellWithUs/>
    </div>
  );
}

export default App;