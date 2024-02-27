import './EulerMejorado.css';
import { useState } from "react";
import nerdamer, { set } from 'nerdamer';
import { round } from '../../helpers/helpers';
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


export default function EulerMejorado(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [func, setFunc] = useState("");
    const [x0, setX0] = useState("");
    const [y0, setY0] = useState("");
    const [size, setSize] = useState("");
    const [loop, setLoop] = useState("");
    const [xsValues, setXsValues] = useState([]);
    const [ysValues, setYsValues] = useState([]);
    const handleClose = () => {
        setOpen(false);
        setXsValues([]);
        setYsValues([]);
    };

    return(
        <div>
            <h1>Euler Mejorado</h1>
                <div className="form-control"> 
                    <label htmlFor="function">f(x,y):</label>
                        <math-field id="function" style={{width: "100%"}}
                            onInput={evt => setFunc(evt.target.value)}
                        >
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
                        onChange={evt => setSize(evt.target.value)}
                        value={size}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="loops">Iteraciones:</label>
                    <input type="text" id="loops" name="loops" 
                        onChange={evt => setLoop(evt.target.value)}
                        value={loop}
                    />
                </div>
                <div className='center'>
                    <button type="button" onClick={solveEulerMejorado}>Calcular</button>
                </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
            <Box sx={style}>
                <Table xData={xsValues} yData={ysValues} />
            </Box>
            </Modal>
        </div>  
    );

    function solveEulerMejorado(){
        
        try {
            let x, y, h, loops, nerdamerExp, evalFunc, intermediateY;
        
            loops = parseInt(loop);
            x = x0;
            y = y0;
            h = size;

            if (func === "" || x0 === "" || y0 === "" || size === "" || loop === ""){
                console.log(func, x0, y0, size, loop);
                alert('Por favor complete todos los campos');
                return;
            }

            if(isNaN(+x) || isNaN(+y) || isNaN(+h) || isNaN(+loops)){
                alert('Por favor, ingrese un número válido');
                return;
            }

            nerdamerExp = nerdamer.convertFromLaTeX(func).toString();
        
            for(let i = 0; i < loops; i++){
            
                evalFunc = nerdamer(nerdamerExp, {x: x, y: y}).evaluate().text('decimals');
                intermediateY = +y + +h * +evalFunc;
        
                x = +x + +h;
                y = +y + h/2 * +evalFunc + +nerdamer(nerdamerExp, {x: x, y: intermediateY})
                    .evaluate()
                    .text('decimals');

                if(isNaN(+y)||isNaN(+x)){
                    alert('Ha ocurrido un error. Por favor, revise los datos ingresados');
                    return;
                }

                xsValues.push(x);
                ysValues.push(y);
            }

            setXsValues(xsValues);
            setYsValues(ysValues);

            handleOpen();
        }
        catch(error){
            alert('Ocurrió un error, por favor verifique los datos ingresados')
            console.log(error);
        }
    }

}