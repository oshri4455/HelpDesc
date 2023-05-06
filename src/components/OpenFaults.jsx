import React from 'react'
import './style.css'
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Commend from './Commend'


export default function OpenFaults(props) {
 



  return (
    <div>
<div >
<h4>תקלות פתוחות</h4>

<table >
  <thead>
<tr >

<th className='th' >פירוט קריאה</th>
<th className='th'>טלפון</th>
<th className='th' >חדר</th>
<th className='th' >שם</th>
<th  className='th'>מספר <br /> קריאה</th>
</tr>
</thead>
</table>
</div>

{props.faultd.map((val,index)=>{

    return <table key={index}  id='table1' style={{color:props.color}} >
    <tr  id='table1' style={{color:props.color}}>
    <td  id='table1'  style={{color:props.color}} >{val.phone}</td>
    <td  id='table1' style={{color:props.color}}>{val.room}</td>
    <td  id='table1' style={{color:props.color}} >{val.name}</td>
    <td  id='table1' style={{color:props.color}}>{val.mat}</td>
    <textarea  style={{color:props.color}} name="" id="text" cols="30" rows="10">{val.exp}</textarea>
   <Link to={`HelpPage${val.name}`} ><button id='button1' >+</button></Link>
    </tr>
    </table>
})}

    </div>
  )
}
