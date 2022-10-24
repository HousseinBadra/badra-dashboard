import { login } from "../../features/login/login"
import "./index.css"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useState } from "react"


export const Form=()=>{
    const loading=useSelector((state)=>state.login.loading)
    const dispatch=useDispatch()
    const [formdata,setformdata]=useState({
        name:"",
        password:""
    })

function handlechange(e){
    setformdata((old)=>{
        return {...old,[e.target.name]:e.target.value}
    })
}


    if (loading) return (<div className="spinner-border text-primary" role="status"></div>)

    return (<div>  <form>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" name='name' value={formdata.name} onChange={handlechange} />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={formdata.password} onChange={handlechange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={()=>{
    dispatch(login(formdata))
  }}>Loggin</button>
</form> 
    </div> )
}