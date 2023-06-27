import 'bootstrap/dist/css/bootstrap.css';
import './table.css'
import './tableAdmin.css'
import Button from '@mui/material/Button'
import axios from 'axios';
import { useState, useEffect, useParams } from "react";
export default function TableAdmin({ theadData, tbodyData,flag }) {
    useEffect(() => {

    }, [tbodyData]);
    const handlerdelete = async (id) => {
        var token = localStorage.getItem('tokenAccess')
        

        console.log("ini id",id)
        const response = await axios({
            method: "delete",
            url: `https://backend-ta.ndne.id/api/users/${id}`,
          
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);

        window.location.reload();
       
    }
    return (
        <table className='fl-tableAdmin'>

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
                            <th style={{ width: "20%" }} key={heading}>{heading}</th>
                        </>
                    })}
                    <th style={{ width: "10%" }} ></th>
                    <th style={{ width: "10%" }} ></th>
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            return <td className='ml-5'key={row[key]}>{row[key]}</td>
                        })}

                        <td>
                            
                            <Button >{"Edit"} {row.id}</Button>
                        </td>
                        <td>
                            
                            <Button  onClick={() => handlerdelete(row.id)}><img src='/Trash.png' /></Button>
                        </td>
                    </tr>;
                })}
            </tbody>
        </table>
    );
}