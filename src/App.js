import './App.css';
import "//unpkg.com/mathlive";
import RungeKutta from './Components/RungeKutta/RungeKutta';
import NewtonRaphson from './Components/NewtonRaphson/NewtonRaphson';
import EulerMejorado from './Components/EulerMejorado/EulerMejorado';
import { useState } from 'react';
  
function App() {
    const [showRungeKutta, setShowRungeKutta] = useState(true);
    const [showNewtonRaphson, setShowNewtonRaphson] = useState(false);
    const [showEulerMejorado, setShowEulerMejorado] = useState(false);

    window.mathVirtualKeyboard.layouts = ["numeric", "symbols", "alphabetic"];
    return (
      <div className='App'>
        <div className="container">
          <div className='pills-container'>
            <div className={`pill${showRungeKutta ? '-active' : ''}`} onClick={ShowRungeKutta}>Runge-Kutta</div>
            <div className={`pill${showNewtonRaphson ? '-active' : ''}`} onClick={ShowNewtonRaphson}>Newton-Raphson</div>
            <div className={`pill${showEulerMejorado ? '-active' : ''}`} onClick={ShowEulerMejorado}>Euler Mejorado</div>
          </div>
          <div className="principal-container">
            {showRungeKutta && <RungeKutta/>}
            {showNewtonRaphson && <NewtonRaphson/>}
            {showEulerMejorado && <EulerMejorado/>}
          </div>
        </div>
      </div>
    );

    function ShowRungeKutta() {
      setShowRungeKutta(true);
      setShowNewtonRaphson(false);
      setShowEulerMejorado(false);
    }

    function ShowNewtonRaphson() {
      setShowRungeKutta(false);
      setShowNewtonRaphson(true);
      setShowEulerMejorado(false);
    }

    function ShowEulerMejorado() {
      setShowRungeKutta(false);
      setShowNewtonRaphson(false);
      setShowEulerMejorado(true);
    }
  }

export default App;
