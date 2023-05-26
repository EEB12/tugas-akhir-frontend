import 'bootstrap/dist/css/bootstrap.css';
import './table.css'
export default function Table({ theadData, tbodyData }) {
    console.log(tbodyData)
    return (
        <table className=' fl-table  rounded rounded-3 '>

            {/* 
            <colgroup>
                <col span="1" style={{width: "20%"}} />
                <col span="1"style={{width: "50%"}} />
                <col span="1" style={{width: "10%"}} />
                <col span="1" style={{width: "10%"}} />
            </colgroup> */}
            <thead>
                <tr>
                    {theadData.map(heading => {

                        return <>
                            <th style={{ width: "10%" }} key={heading}>{heading}</th>
                        </>
                    })}
                    {/* <th style={{ width: "10%" }} >Action</th> */}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            return <td className='ml-5' key={row[key]}>{row[key]}</td>
                        })}

                        {/* <td>
                            {" "}
                            <button >{"delete"}</button>
                        </td> */}
                    </tr>;
                })}
            </tbody>
        </table>
    );
}