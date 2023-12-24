import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate } from 'react-router-dom'

function Signup() {
  const Navigate=useNavigate();
    const [credentials,setcredentials]=useState({name:" ",email:" ",password:"",geolocation:" "})
    const handleSubmit=async(e)=>{
         e.preventDefault();
         const response= await fetch("https://food-app-backened.onrender.com/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.geolocation
            }) //or u can use axios.post(...)
         });
         const json=await response.json();
         console.log(json);
         if(!json.success)
         {
            alert("enter valid credentials")
         }
         else{
          alert('succesfull')
  Navigate('/');
         }         

    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    
    <div className='container' >
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} id="exampleInputPassword1" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
</form>
    </div>
  )
}

export default Signup