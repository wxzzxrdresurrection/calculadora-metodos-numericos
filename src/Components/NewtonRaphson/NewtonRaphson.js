import { useState } from "react";
import nerdamer from 'nerdamer';
import { create, all } from 'mathjs'
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

export default function NewtonRaphson(){
    const [func, setFunc] = useState("");
    const [x0, setX0] = useState("");
    const [loops, setLoops] = useState("");
    const [open, setOpen] = useState(false);
    const [xValues, setXValues] = useState([]);
    const [funcValues, setFuncValues] = useState([]);
    const [derivativeValues, setDerivativeValues] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setXValues([]);
        setFuncValues([]);
        setDerivativeValues([]);
    };

    const config = { }
    const math = create(all, config)

    return(
        <div>
            <h1>Newton-Raphson</h1>
                <div className="form-control"> 
                    <label htmlFor="function">f(x): </label>
                    <math-field id="function" style={{width: "100%"}}
                        onInput={evt => setFunc(evt.target.value)}>
                        {func}
                    </math-field>
                </div>
                <div className="form-control">
                    <label htmlFor="x0">x<sub>0</sub>: </label>
                    <input type="text" id="x0" name="x0"
                        onChange={evt => setX0(evt.target.value)}
                        value={x0}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="loops">Iteraciones: </label>
                    <input type="text" id="loops" name="loops" 
                        onChange={evt => setLoops(evt.target.value)}
                        value={loops}
                    />
                </div>
                <div className="center">
                    <button type="button" onClick={solveNewtonRaphson}>Calcular</button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                <Box sx={style}>
                    <Table 
                        xData={xValues}
                        yData={funcValues}
                        zData={derivativeValues}
                    />
                </Box>
                </Modal>
        </div>  
    );

    function solveNewtonRaphson(){
    
        try{
            
            let x = x0;
    
            if (func === "" || x0 === "" || loops === ""){
                alert("Por favor, llene todos los campos");
                return;
            }

            if (loops < 1){
                alert("El número de iteraciones debe ser mayor a 0");
                return;
            }

            if (isNaN(+x0) || isNaN(+loops)){
                alert("Por favor, ingrese un número válido");
                return;
            }
        
            const nerdamerExp = nerdamer.convertFromLaTeX(func).toString();
            const derivative = math.derivative(nerdamerExp, 'x').toString();
    
            console.log(nerdamerExp);
            console.log(derivative);


            for (let i = 0; i < +loops; i++){
    
    
                let xEval = nerdamer(nerdamerExp.toString(), { x: x}).evaluate().text('decimals');
                let yEval = nerdamer(derivative.toString(), { x: x}).evaluate().text('decimals');

                console.log(xEval);
                console.log(yEval);
    
                x = x - (xEval / yEval);
    
                if(isNaN(+yEval)||isNaN(+x)){
                    console.log(x)
                    console.log(yEval)
                    alert('Ha ocurrido un error. Por favor, revise los datos ingresados');
                    return;
                }

                xValues.push(x);
                funcValues.push(xEval);
                derivativeValues.push(yEval);
    
            }
            handleOpen();
            
        }
        catch(err){
            alert('Ocurrió un error al hacer los cálculos');
            console.log(err);
        }

    }

}