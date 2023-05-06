import React from 'react'
import { useState ,useEffect} from 'react'
import './style.css'
import { Link } from 'react-router-dom'



export default function OpenHelpPage(props) {
const [functions,setfunctions] = useState('פתוחה')
const [names,setnames] = useState('')
const [dateTime,setdateTime] = useState('')
const [selectedNameIndex, setSelectedNameIndex] = useState(null);



  return (
    <div>
   <h2 style={{color:'red'}}>קריאה מספר : {props.mat} </h2>
   <h3>זמן הקריאה :</h3>
  <h3 style={{color:'blue'}}> {props.Date}</h3>
 <label id='label' htmlFor="">שם: </label>       
<input id='inpt' type="text" value={props.name}/>
<label id='label' htmlFor="">חדר: </label>
<input id='inpt' type="text" value={props.room}/>
<label id='label' htmlFor="">טלפון: </label>
<input id='inpt' type="text" value={props.phone}/>
<br />
<br />
<br />
<br />
<label id='label1' htmlFor="">פירוט הקריאה : </label>
<br />
<br />

<textarea style={{fontSize:'30px'}} name="" id="inptExp" cols="30" rows="10" defaultValue={props.exp}></textarea>
<br />
<br />

<label id='labal2' htmlFor="">סטטוס : </label>
<select value={functions} onChange={(e)=>{setfunctions(e.target.value)}} name="" id="select1">
<option value="פתוחה">פתוחה</option>
<option value="בטיפול">בטיפול</option>
<option value="סגורה">סגורה</option>
<option value="דחויה">דחויה</option>
</select>

<br />

<select value={names} onChange={(e)=>{setnames(e.target.value)}} name="" id="select2">
  <option value="">בחר מהרשימה</option>
  <option value="אושרי">אושרי</option>
  <option value="יוסי">יוסי</option>
</select>
<input onChange={(e)=>{setdateTime(e.target.value)}}  id='date' type='date' />
<Link to={'/'}><button onClick={()=>{props.addFunction(props.index,functions,names,dateTime)}} id='buttonPge'>שלח</button></Link>

    </div>
  )
}
