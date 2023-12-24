import React ,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

function Login() {
  const [credentials,setcredentials]=useState({email:" ",password:"",})
  let navigate=useNavigate();
    const handleSubmit=async(e)=>{
         e.preventDefault();
         const response= await fetch("https://food-app-backened.onrender.com/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                email:credentials.email,
                password:credentials.password
                
            }) //or u can use axios.post(...)
         });
         const json=await response.json();
         console.log(json);
         if(!json.success)
         {
            alert("enter valid credentials")
         }
         else{
          localStorage.setItem("userEmail",credentials.email)
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"))
          navigate("/")
         }
         

    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    <div className='container' >
    <form onSubmit={handleSubmit}>
   
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}/>
  </div>
 
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'>New user</Link>
</form>
    </div>
  )
}

export default Login
