import "./App.css";
import MemepageNavbar from "./MemepageNavbar";
import MemeScroll from "./MemeScroll";
import MemeUploadForm from "./MemeUploadMenu";
function App() {
  return (
    <>
      <MemepageNavbar />
      <div className="scroll-wheel">
        <MemeUploadForm />
        <MemeScroll />
      </div>
    </>
  );
}

export default App;
