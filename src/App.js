import './App.css';
import { useSelector } from 'react-redux';
import { Form } from './components/form';
import { Dashboard } from './components/dashboard';
import Modal from './components/Modal';

function App() {
  const user=useSelector((state)=>state.login.UID)
  const modalopen=useSelector((state)=>state.modal.isopen)
  
  return (
    <div className="App">
      {user === "" ? <Form/> :<><Dashboard/> {modalopen? <Modal/> : null}</> }
    </div>
  );
}

export default App;
