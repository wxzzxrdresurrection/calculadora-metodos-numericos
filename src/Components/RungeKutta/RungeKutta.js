import './RungeKutta.css';
import { useState } from "react";
import nerdamer from 'nerdamer';
import {round} from '../../helpers/helpers';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '../Table';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function RungeKutta(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [func, setFunc] = useState("");
    const [x0, setX0] = useState("");
    const [y0, setY0] = useState("");
    const [steps, setSteps] = useState("");
    const [n, setN] = useState("");
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const handleClose = () => {
        setOpen(false);
        setXValues([]);
        setYValues([]);
    };

    return(
      <div>
        <h1>Runge Kutta</h1>
            <div className="form-control"> 
                <label htmlFor="function">f(x,y):</label>
                <math-field id="function" style={{width: "100%"}}
                    onInput={evt => setFunc(evt.target.value)}>
                    {func}
                </math-field>
            </div>
            
            <div className="form-control">
                <label htmlFor="x0">x<sub>0</sub>:</label>
                <input type="text" id="x0" name="x0"
                    onChange={evt => setX0(evt.target.value)}
                    value={x0}
                />
            </div>
            <div className="form-control">
                <label htmlFor="y0">y<sub>0</sub>:</label>
                <input type="text" id="y0" name="y0" 
                    onChange={evt => setY0(evt.target.value)}
                    value={y0}
                />
            </div>
            <div className="form-control">
                <label htmlFor="h">h:</label>
                <input type="text" id="h" name="h"
                    onChange={evt => setSteps(evt.target.value)}
                    value={steps}
                />
            </div>
            <div className="form-control">
                <label htmlFor="n">n:</label>
                <input type="text" id="n" name="n" required="required"
                    onChange={evt => setN(evt.target.value)}
                    value={n}
                />
            </div>
            <div className="center">
                <button type="button" onClick={solveRungeKutta}>Calcular</button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
            <Box sx={style}>
                <Table xData={xValues} yData={yValues} />
            </Box>
            </Modal>
      </div>  
    );


    function solveRungeKutta(){

        if(func === "" || x0 === "" || y0 === "" || steps === "" || n === ""){
            alert('Por favor, llene todos los campos');
            return;
        }

        if(isNaN(+x0) || isNaN(+y0) || isNaN(+steps) || isNaN(+n)){
            alert('Por favor, ingrese un número válido');
            return;
        }

        try{
            let k1, k2, k3, k4, xk, yk2, yk3, xk4, yk4, next_y, x, y, h;

            x = x0;
            y = y0;
            h = steps;
            console.log(y)

            const nerdamerExp = nerdamer.convertFromLaTeX(func).toString();
            console.log(nerdamerExp)
            
            for (let i = 0; i < n; i++) {
    
                k1 = nerdamer(nerdamerExp.toString(), { x: x, y: y}).evaluate().text('decimals');
        
                xk = nerdamer('x+(h/2)', { x: x, h: h }).evaluate().text('decimals');
        
                yk2 = nerdamer('y+k*(h/2)', { y: y, k: k1, h: h}).evaluate().text('decimals');
                // round(+yk2, 5);
        
                k2 = nerdamer(nerdamerExp, { x: xk, y: yk2 }).evaluate().text('decimals');
                // round(+k2, 5);
        
                yk3 = nerdamer('y+k*(h/2)', { y: y, k: k2, h: h}).evaluate().text('decimals');
                // round(+yk3, 5);
        
                k3 = nerdamer(nerdamerExp, { x: xk, y: yk3 }).evaluate().text('decimals');
                // round(+k3, 5);
        
                xk4 = nerdamer('x+h', { x: x, h: h }).evaluate().text('decimals');
        
                yk4 = nerdamer('y+k*h', { y: y, k: k3, h: h}).evaluate().text('decimals');
                // round(+yk4, 5);
        
                k4 = nerdamer(nerdamerExp, { x: xk4, y: yk4 }).evaluate().text('decimals');
                // round(+k4, 5);
        
                next_y = nerdamer('y + (1/6)*(k1 + 2*k2 + 2*k3 + k4)*h', { y: y, k1: k1, k2: k2, k3: k3, k4: k4, h: h }).evaluate();
        
        
                x = round(+x + +h,5);
                x = x.toString();
        
                y = next_y.text('decimals');

                if(isNaN(+y)||isNaN(+x)){
                    alert('Ha ocurrido un error. Por favor, revise los datos ingresados');
                    return;
                }

                xValues.push(x);
                yValues.push(y);

                console.log(x)
                console.log(y)
        
              }

              handleOpen();

        }
        catch(e){
            alert('Ha ocurrido un error. Por favor, revise los datos ingresados');
            console.log(e);
            console.log(xValues)
            console.log(yValues)


        }
    }
}
