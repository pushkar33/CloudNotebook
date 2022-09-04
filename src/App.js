
//import './App.css';

import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {

  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{

    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
     setalert(null);
    },1500)

  }

  return (
    
      <>
      <NoteState>
        
      <BrowserRouter>

       <Navbar showAlert={showAlert}/> 
       <Alert alert={alert}/>  

       <div className="container">
           
        
        <Routes>


        <Route exact path="/home" element={<Home showAlert={showAlert}/>}>
        
        </Route>
        
        <Route exact path="/about" element={<About showAlert={showAlert}/>}>
          
        </Route>

        <Route exact path="/login" element={<Login showAlert={showAlert}/>}>
          
        </Route>        

        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}>
          
        </Route>

        

        </Routes>

      </div>  
      
      
      </BrowserRouter>

      </NoteState>
      </>
      
      // {/* <h1 className="btn btn-primary">Hello Welcome to Cloud Notebook By Pushkar</h1> */}
    // </div>
  );
}

export default App;
