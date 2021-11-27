import './App.css';
import Feedback1 from './components/feedbackPhase1'
import Feedback2 from './components/feedbackPhase2'

function App() {
  return (
    <div className="App" style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Feedback1/>
      <Feedback2/>
    </div>
  );
}

export default App;
