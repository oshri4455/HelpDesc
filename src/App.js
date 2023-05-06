import logo from './logo.svg';
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Menu from './components/Menu';
import OpenFaults from './components/OpenFaults';
import ClosedFaultd from './components/ClosedFaultd';
import OpenHelp from './components/OpenHelp';
import Deferredfaults from './components/Deferredfaults';
import { useState,useEffect } from 'react';
import OpenHelpPage from './components/OpenHelpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Commend from './components/Commend';
import './components/style.css'


function App() {
const[faultd,setFaultd] = useState([])
const [selectedNameIndex, setSelectedNameIndex] = useState(null);
const[closeFaultd,setcloseFaultd] = useState([])
const [deferredfaults,setdeferredfaults]=useState([])

const [color,setColor] = useState('red')
const[openFaultd,setOpenFultd] =useState([])



const setColorByStatus = (status) => {
  if (status === "בטיפול") {
    return "black";
  }
  switch (status) {
    case "פתוחה":
      return "red";
    case "סגורה":
      return "green";
    case "דחויה":
      return "yellow";
    default:
      return "black";
  }
  
};

const addFunction = (index, newStatus, names) => {
  const faultdToMove = faultd[index];

  if (!names || names === "") {
    alert("חובה לבחור שם");
    return;
  }

  // update the name and status of the faultd being moved
  const updatedFaultd = { ...faultdToMove, names, status: newStatus };
  const updatedFaultds = [...faultd];
  updatedFaultds[index] = updatedFaultd;

  if (newStatus === 'סגורה') {
    const currentFaultd = [...faultd];
    const currentCloseFaultd = [...closeFaultd];
    currentFaultd.splice(index, 1);
    currentCloseFaultd.push(updatedFaultd);
    setFaultd(currentFaultd);
    setcloseFaultd(currentCloseFaultd);
    setColor(color.map((c, i) => i === index ? 'green' : c));
  } else if (newStatus === 'פתוחה') {
    const currentCloseFaultd = [...closeFaultd];
    const newOpenFaultd = [];
    currentCloseFaultd.forEach((fault, i) => {
      if (i === index && fault.names === names && fault.status.includes('סגורה')) {
        const currentFaultd = [...faultd];
        currentFaultd.push(updatedFaultd);
        setFaultd(currentFaultd);
        setcloseFaultd(currentCloseFaultd.filter((fault) => fault !== faultdToMove));
        setColor(color.map((c, i) => i === index ? setColorByStatus(newStatus) : c));
      } else {
        newOpenFaultd.push(fault);
      }
    });
    setOpenFultd([...openFaultd, ...newOpenFaultd]);
  } else if (newStatus === 'בטיפול') {
    const currentFaultd = [...faultd];
    currentFaultd[index].status = newStatus;
    setFaultd(currentFaultd);
    setColor(color.map((c, i) => {
      if (i === index) {
        return faultdToMove.status === 'פתוחה' ? setColorByStatus('פתוחה') : 'black';
      } else {
        return c;
      }
    }));
  } else if (newStatus === 'דחויה') {
    const currentFaultd = [...faultd];
    currentFaultd.splice(index, 1);
    setFaultd(currentFaultd);
    setColor(color.map((c, i) => i === index ? 'yellow' : c));
  } else {
    alert('פונקציה לא חוקית');
  }
};
const createFault = (n, r, p, e, t) => {
  const date = new Date();
  let temp = {
    id: Math.random().toString(36).substring(2, 9), // מספר מזהה אקראי
    name: n,
    room: r,
    phone: p,
    exp: e,
    mat: Math.floor(Math.random() * 378786 - 521212) + 521212,
    date: date.toLocaleString(),
    today: t,
    status: 'פתוחה'
  };
  if (temp.room.length > 4) {
    alert('the length off room not ok');
    return false;
  }
  if (isNaN(temp.room)) {
    alert('the room need to be a number');
    return false;
  }
  if (isNaN(temp.phone)) {
    alert('the phone need to be a number');
    return false;
  }
  if (temp.phone.length <= 9 || temp.phone.length < 10) {
    alert('the phone length small 10 or 9');
    return false;
  }
  
   setFaultd([...faultd,temp])
  alert('הקריאה נפתחה בהצלחה');
};

const date = new Date();
  

  


  return (
    <div className="App">
     


<h1>אב בית</h1>
<h5 style={{color:'blue'}}>{date.toLocaleString()}</h5>
<BrowserRouter>
<Menu   />
<Routes>

<Route path='/' element = {<OpenFaults  faultd ={faultd} closeFaultd = {closeFaultd} addFunction = {addFunction}   color = {color} openFaultd = {openFaultd}  />}   />

<Route path='/תקלותסגורות' element = {<ClosedFaultd  closeFaultd = {closeFaultd} addFunction = {addFunction} createFaultd = {createFault} faultd = {faultd}   color = {color} openFaultd = {openFaultd}/>} />



<Route path='/פתיחתתקלה' element = {<OpenHelp faultd = {faultd}  createFaultd = {createFault} />} />

<Route path= '/תקלותדחויות' element = {<Deferredfaults  closeFaultd = {closeFaultd} addFunction = {addFunction} createFaultd = {createFault} faultd = {faultd} deferredfaults = {deferredfaults}  color = {color} />}  />
{deferredfaults.map((val,index)=>{
   return <Route path={`/HelpPage${val.name}`} element = {<OpenHelpPage  Date = {val.date} dateTime = {val.dateTime} name = {val.name} room = {val.room} phone = {val.phone} exp = {val.exp}  mat = {val.mat} index = {index} addFunction = {addFunction}  closeFaultd ={closeFaultd}  color = {color}  faultd = {faultd}  />}  />
})}
{faultd.map((val,index)=>{
  return <Route path={`/HelpPage${val.name}`} element = {<OpenHelpPage  Date = {val.date} name = {val.name} room = {val.room} phone = {val.phone} exp = {val.exp}  mat = {val.mat} index = {index} addFunction = {addFunction} closeFaultd ={closeFaultd} color = {color} openFaultd = {openFaultd} faultd = {faultd}  />}  />
})}
{closeFaultd.map((val,index)=>{
  return <Route path={`/HelpPage${val.name}`} element = {<OpenHelpPage  Date = {val.date} name= {val.name} room = {val.room} phone = {val.phone} mat = {val.mat} exp = {val.exp} index = {index} addFunction = {addFunction}  closeFaultd ={closeFaultd} color = {color} openFaultd = {openFaultd} faultd = {faultd}   />}  />
})}
{openFaultd.map((val,index)=>{
  return <Route path={`/HelpPage${val.name}`} element = {<OpenHelpPage  Date = {val.date} name= {val.name} room = {val.room} phone = {val.phone} mat = {val.mat} exp = {val.exp} index = {index} addFunction = {addFunction}  closeFaultd ={closeFaultd} color = {color} openFaultd = {openFaultd} faultd = {faultd}   />}  />
})}

</Routes>
</BrowserRouter>










    </div>
  );
}

export default App;
