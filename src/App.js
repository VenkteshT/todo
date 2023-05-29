import "./App.css";
import Todo from "./Todo";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Todo />
    </div>
  );
}

export default App;
