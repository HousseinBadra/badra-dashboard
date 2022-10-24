import { useEffect } from "react"
import { gettrials } from "../../features/dasboard/dashboard"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import "./index.css"
import Trial from "../trial"
import { gettutors } from "../../features/dasboard/dashboard"
import { setfilter } from "../../features/dasboard/dashboard"


export const Dashboard=()=>{
  const {trials}=  useSelector((state)=> state.dashboard)
  const filter=useSelector((state)=>state.dashboard.filter)
  const {rank,publickey}=useSelector((state)=>state.login)

    const dispatch=useDispatch()
    useEffect(()=>{
   dispatch(gettrials())
    },[])

    useEffect(()=>{
   dispatch(gettutors())
    },[])

function changefilter(e){
  dispatch(setfilter(e.target.value))
}

    return (<div className="dashboard">
      <div className="sort-div">
      <select value={filter} onChange={changefilter} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
  <option  value='All'>Show all trials</option>
  <option value="completed">Show finished trials</option>
  <option value="contacted">Show contacted trials</option>
 
</select>
        
        </div>
        {trials.filter((elem)=>{if(rank ==='admin') {return true}
        else{return elem.tutorid===publickey}                 
      }).filter((elem)=>{if (filter ==="All") return true
                         return elem[filter]
      }).map((elem)=> <Trial key={elem._id} {...elem}/>  )}
    </div>
   
  )
}