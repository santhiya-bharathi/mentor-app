
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const API_URL = "https://assigning-mentor-student.herokuapp.com";

export default function App() {

// const mentorAndStudent = [
//   {
// "id": "100",
// "mentor":"anbu",
// "student": "san"
//   },
//   {
//     "id": "101",
//     "mentor":"jen",
//     "student": "kir"
//       },
//       {
//         "id": "102",
//         "mentor":"harish",
//         "student": "priya"
//           }
// ]


// const onlyMentor = [
// {
//   "id": "100",
// "mentor":"anbu"
// },
// {
//   "id": "101",
//     "mentor":"jen"
// },
// {
//   "id": "102",
//         "mentor":"harish"
// }
// ]

// const onlyStudents = [
//   {
//     "id": "100",
//     "student": "san"
//       },
//       {
//         "id": "101",
//         "student": "kir"
//           },
//           {
//             "id": "102",
//             "student": "priya"
//               }
// ]

const [mentorandstudent, setMentorandstudent] = useState([]);

const [mentors, setMentors] = useState([]);

const [students, setStudents] = useState([]);

  const history = useHistory();
  const [mode, setMode] = useState("dark");
const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});

console.log(mentorandstudent);

useEffect(()=>{
  fetch(`${API_URL}/mentorlist`, {method:"GET"})
  .then((data)=>data.json())
  .then((mvs)=>setMentorandstudent(mvs));
}, []);

console.log(mentors);

useEffect(()=>{
  fetch(`${API_URL}/onlymentorlist`, {method:"GET"})
  .then((data)=>data.json())
  .then((mvs)=>setMentors(mvs));
}, []);

console.log(students);

useEffect(()=>{
  fetch(`${API_URL}/onlystudentslist`, {method:"GET"})
  .then((data)=>data.json())
  .then((mvs)=>setStudents(mvs));
}, []);

  return (
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={3} style={{borderRadius:"0px",minHeight:"100vh"}}>
    <div className="App">
    <AppBar position="static">
       <Toolbar>
       <Button varient="text" color="inherit" onClick={()=>history.push("/")}>Dashboard</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/onlymentor")}>Mentors</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/onlystudents")}>Students</Button>
       
       <Button varient="text" color="inherit" style={{marginLeft:"auto"}} onClick={()=>setMode(mode==="light"? "dark":"light")}>{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {mode==="light"? "Dark":"Light"}Mode</Button>
       </Toolbar>
       </AppBar>

       <Switch>
      <Route exact path="/">
          <Home />
        </Route>

        <Route path="/edit/:id">
          <Update />
        </Route>

        <Route path="/onlymentor">
          <Onlymentor />
        </Route>

        <Route path="/addmentor">
          <Addmentors />
        </Route>

        <Route path="/onlystudents">
          <Onlystudents />
        </Route>

        <Route path="/addstudents">
          <Addstudent />
        </Route>

        </Switch>
    </div>
    </Paper>
    </ThemeProvider>
  );
}

function Home() {
  const history = useHistory();
  const [mentorandstudent, setMentorandstudent] = useState([]);
useEffect(()=>{
  fetch(`${API_URL}/mentorlist`, {method:"GET"})
  .then((data)=>data.json())
  .then((mvs)=>setMentorandstudent(mvs));
}, []);
  return (
    <section>
     {mentorandstudent.map(({mentor,student, id, _id})=><Mentorandstudentlist key = {_id} mentor={mentor} student={student} id={_id}
      editButton= {<IconButton 
        style={{marginLeft:"auto"}}
        aria-label="edit"  color="success"
       onClick={()=>history.push("/edit/" + _id)}>
       <EditIcon />
     </IconButton>}
     />)}
    </section>
  );
}


function Mentorandstudentlist({mentor, student, editButton}){
  return(
    <div className="div-mentandstu">
     <div>
        <h3 className="mentandstu">Mentor: {mentor}</h3>
        <h3 className="mentandstu">Student: {student}</h3>
        {editButton}
        </div>
    </div>
  );
}


 function Update(){
  const {id} = useParams();
  const [detail, setDetail] = useState(null);
  useEffect(()=>{
    fetch(`${API_URL}/mentorlist/${id}`, {method:"GET"})
    .then((data)=>data.json())
    .then((mv)=>setDetail(mv));
  }, [id]);
   return detail? <Editmentorandstudentlist detail={detail}/>:"";
 }
function Editmentorandstudentlist({detail}){
  const history = useHistory();
  const [mentor, setMentor] = useState(detail.mentor)
  const [student, setStudent] = useState(detail.student)

   const editAnswer =()=>{
    const updatedAnswer= {mentor, student};
    console.log(updatedAnswer);
    
    fetch(`${API_URL}/mentorlist/${detail._id}`, {
      method:"PUT",
      body: JSON.stringify(updatedAnswer),
      headers: {'Content-Type': 'application/json'},
  }).then(()=>history.push("/"))
  };

  return(
    <section className='edit-but'>
<TextField value={mentor} 
      onChange={(event)=>setMentor(event.target.value)}  label="enter mentor name" variant="outlined" />
       <TextField value={student} 
      onChange={(event)=>setStudent(event.target.value)}  label="enter students name" variant="outlined" />
      <Button onClick={editAnswer} variant="contained">Save</Button>
      </section>
  );
}

function Onlymentor(){
  const history = useHistory();

  const [mentors, setMentors] = useState([]);
  useEffect(()=>{
    fetch(`${API_URL}/onlymentorlist`, {method:"GET"})
    .then((data)=>data.json())
    .then((mvs)=>setMentors(mvs));
  }, []);

  return(
    <section>

      <div className="but-add-mentor">
      <h2>MENTORS</h2>
      <Button variant="contained" color="primary" onClick={()=>history.push("/addmentor")}>Add Mentors</Button>
      </div>

    {mentors.map(({mentor},index)=><Mentorlist mentor={mentor}/>)}
    </section>
  );
}

function Mentorlist({mentor}){
  return(
<div className="div-mentor">
  <h3 className="mentandstu">{mentor}</h3>
</div>
  );
}

function Addmentors(){
  const history = useHistory();
const [mentor, setMentor] = useState("")

  // const addmentor =()=>{
  //   const newment= {mentor};
  //   setMentors([...mentors,newment]);
  //   history.push("/onlymentor");
  // };
  const addmentor =()=>{
    const newment= {mentor};
    console.log(newment)
      fetch(`${API_URL}/onlymentorlist`, {
        method:"POST",
        body: JSON.stringify(newment),
        headers: {'Content-Type': 'application/json'},
    }).then(()=>history.push("/onlymentor"));
      
    };

  return(
    <div className='add-mentor'>

       <TextField value={mentor} 
    onChange={(event)=>setMentor(event.target.value)}  label="enter mentor name" variant="outlined" />

     <Button variant="outlined" color="inherit" onClick={addmentor}>Post Mentor</Button>
    </div>
  );
}

function Onlystudents(){
  const history = useHistory();
  const [students, setStudents] = useState([]);
useEffect(()=>{
  fetch(`${API_URL}/onlystudentslist`, {method:"GET"})
  .then((data)=>data.json())
  .then((mvs)=>setStudents(mvs));
}, []);
  return(
    <section>
      <div className="but-add-mentor">
      <h2>STUDENTS</h2>
      <Button variant="contained" color="primary" onClick={()=>history.push("/addstudents")}>Add Students</Button>
      </div>
    {students.map(({student},index)=><Studentslist student={student}/>)}
    </section>
  );
}

function Studentslist({student}){
  return(
<div className="div-mentor">
  <h3 className="mentandstu">{student}</h3>
</div>
  );
}

function Addstudent(){
  const history = useHistory();
const [student, setStudent] = useState("")

  // const addmentor =()=>{
  //   const newstu= {student};
  //   setStudents([...students,newstu]);
  //   history.push("/onlystudents");
  // };

  const addmentor =()=>{
    const newstu= {student};
    console.log(newstu)
      fetch(`${API_URL}/onlystudentslist`, {
        method:"POST",
        body: JSON.stringify(newstu),
        headers: {'Content-Type': 'application/json'},
    }).then(()=>history.push("/onlystudents"));
      
    };

  return(
    <div className='add-mentor'>

       <TextField value={student} 
    onChange={(event)=>setStudent(event.target.value)}  label="enter mentor name" variant="outlined" />

     <Button variant="outlined" color="inherit" onClick={addmentor}>Post Student</Button>
    </div>
  );
}