import './App.css';
import { OrderAdder } from "./components/OrderAdder.js"
import { OrderLister } from "./components/OrderLister.js"


function App() {
  return (
    <div className="App">
      <OrderAdder />
      <OrderLister />
    </div>
  );
}

export default App;
