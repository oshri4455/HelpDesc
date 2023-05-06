import React from 'react'
import { Link } from 'react-router-dom'
export default function Deferredfaults(props) {
  return (
    <div>

<h4>תקלות דחויות</h4>

<table>
<tr>
<th className='th' >פירוט קריאה</th>
<th className='th'>טלפון</th>
<th className='th' >חדר</th>
<th className='th' >שם</th>
<th  className='th'>מספר <br /> קריאה</th>
</tr>
</table>

{props.deferredfaults.map((val,index)=>{
return <table id='table1' style={{border:'2px',color:'red'}}>
<tr id='table1' >
<td id='table1' style={{color:'black'}}>{val.exp}</td>
<td  id='table1' style={{color:'black'}} >{val.dateTime}</td>
<td  id='table1' style={{color:'black'}} >{val.phone}</td>
<td  id='table1' style={{color:'black'}} >{val.room}</td>
<td style={{color:'black'}} id='table1'>{val.mat}</td>
<textarea style={{color:'black'}} name="" id="text" cols="30" rows="10">{val.exp}</textarea>
<Link to={`/HelpPage${val.name}`} ><button id='button1' onClick={val.index}>+</button></Link>
</tr>
</table>
})}

    </div>
  )
}
