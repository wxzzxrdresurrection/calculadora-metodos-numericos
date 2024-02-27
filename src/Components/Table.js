import './Table.css';

export default function Table({xData, yData, zData = null}) {

    return(
        <div>
            <h1>Tabla de valores</h1>
            <div className="modal">
                <table>
                    <thead>
                        <tr>
                            <th>i</th>
                            <th>x<sub>n</sub></th>
                            <th>y<sub>n</sub></th>
                            {zData && <th>f'(x<sub>n</sub>)</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {xData.map((row, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{row}</td>
                                <td>{yData[index]}</td>
                                {zData && <td>{zData[index]}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}