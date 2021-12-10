
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useState} from "react";
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


export default function App() {

const mentorAndStudent = [
  {
"id": "100",
"mentor":"anbu",
"student": "san"
  },
  {
    "id": "101",
    "mentor":"jen",
    "student": "kir"
      },
      {
        "id": "102",
        "mentor":"harish",
        "student": "priya"
          }
]


const onlyMentor = [
{
  "id": "100",
"mentor":"anbu"
},
{
  "id": "101",
    "mentor":"jen"
},
{
  "id": "102",
        "mentor":"harish"
}
]

const onlyStudents = [
  {
    "id": "100",
    "student": "san"
      },
      {
        "id": "101",
        "student": "kir"
          },
          {
            "id": "102",
            "student": "priya"
              }
]

const [mentorandstudent, setMentorandstudent] = useState(mentorAndStudent);

const [mentors, setMentors] = useState(onlyMentor);

const [students, setStudents] = useState(onlyStudents);

  const history = useHistory();
  const [mode, setMode] = useState("dark");
const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});
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
          <Home mentorandstudent={mentorandstudent}/>
        </Route>

        <Route path="/edit/:id">
          <Editmentorandstudentlist mentorandstudent={mentorandstudent} setMentorandstudent={setMentorandstudent}/>
        </Route>

        <Route path="/onlymentor">
          <Onlymentor mentors={mentors} />
        </Route>

        <Route path="/addmentor">
          <Addmentors mentors={mentors} setMentors={setMentors}/>
        </Route>

        <Route path="/onlystudents">
          <Onlystudents students={students}/>
        </Route>

        <Route path="/addstudents">
          <Addstudent students={students} setStudents={setStudents}/>
        </Route>

        </Switch>
    </div>
    </Paper>
    </ThemeProvider>
  );
}

function Home({mentorandstudent}) {
  const history = useHistory();
  return (
    <section>
     {mentorandstudent.map(({mentor,student},index)=><Mentorandstudentlist mentor={mentor} student={student} id={index}
      editButton= {<IconButton 
        style={{marginLeft:"auto"}}
        aria-label="edit"  color="success"
       onClick={()=>history.push("/edit/" + index)}>
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

function Editmentorandstudentlist({mentorandstudent, setMentorandstudent}){
  const history = useHistory();
  const {id} = useParams();
  const detail = mentorandstudent[id]; 
  const [mentor, setMentor] = useState(detail.mentor)
  const [student, setStudent] = useState(detail.student)

   const editAnswer =()=>{
    
    const updatedAnswer= {mentor, student};
    console.log(updatedAnswer);
    const copyAnswer =[...mentorandstudent];
    copyAnswer[id] = updatedAnswer;
    setMentorandstudent(copyAnswer);
    history.push("/");
  };

  return(
    <section>
<TextField value={mentor} 
      onChange={(event)=>setMentor(event.target.value)}  label="enter mentor name" variant="outlined" />
       <TextField value={student} 
      onChange={(event)=>setStudent(event.target.value)}  label="enter students name" variant="outlined" />
      <Button onClick={editAnswer} variant="contained">Save</Button>
      </section>
  );
}

function Onlymentor({mentors}){
  const history = useHistory();
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

function Addmentors({mentors, setMentors}){
  const history = useHistory();
const [mentor, setMentor] = useState("")

  const addmentor =()=>{
    const newment= {mentor};
    setMentors([...mentors,newment]);
    history.push("/onlymentor");
  };
  return(
    <div className='add-mentor'>

       <TextField value={mentor} 
    onChange={(event)=>setMentor(event.target.value)}  label="enter mentor name" variant="outlined" />

     <Button variant="outlined" color="inherit" onClick={addmentor}>Post Mentor</Button>
    </div>
  );
}

function Onlystudents({students}){
  const history = useHistory();
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

function Addstudent({students, setStudents}){
  const history = useHistory();
const [student, setStudent] = useState("")

  const addmentor =()=>{
    const newstu= {student};
    setStudents([...students,newstu]);
    history.push("/onlystudents");
  };
  return(
    <div className='add-mentor'>

       <TextField value={student} 
    onChange={(event)=>setStudent(event.target.value)}  label="enter mentor name" variant="outlined" />

     <Button variant="outlined" color="inherit" onClick={addmentor}>Post Student</Button>
    </div>
  );
}