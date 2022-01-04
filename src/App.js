import VideoBG from './components/VideoBG';
import Slider from './components/Slider';
import About from './components/About';
import Pro from './components/Pro';
import TimeLine from './components/TimeLine';
import Faq from './components/Faq';

function App() {
  return (
    <div>
      <VideoBG />
      <Slider />
      <div className="content-wrapper">
        <About />
        <Pro />
        <TimeLine />
        <Faq />
      </div>
    </div>
  );
}

export default App;
