import "./App.css";
import ReadExcel from "./component/ReadExcel/ReadExcel";
import Header from "./Header/Header";
import Footer from "./component/Footer/Footer";

function App() {
  return (
    <div>
      <Header></Header>
      <ReadExcel></ReadExcel>
      <Footer></Footer>
    </div>
  );
}

export default App;
