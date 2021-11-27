import './App.css';
import Feedback1 from './components/feedbackPhase1'
import Feedback2 from './components/feedbackPhase2'
import Feedback3 from './components/feedbackPhase3'

function App() {
  return (
    <div className="App" style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Feedback1/>
    </div>
  );
}

export default App;
