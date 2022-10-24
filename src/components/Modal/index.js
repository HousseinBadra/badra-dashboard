import './index.css';
import { closemodal } from '../../features/Modal/modal';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { deletetrial,toggle } from '../../features/dasboard/dashboard';
import { settutor } from '../../features/dasboard/dashboard';
import { setdate } from '../../features/dasboard/dashboard';

const Modal=(props)=>{
const dispatch=useDispatch()
const selection=useSelector((state)=>state.modal.selected)
const data=useSelector((state)=>state.dashboard.trials).find((elem)=>elem._id===selection)
const tutors=useSelector((state)=>state.dashboard.tutors)
const tutorinfo=useSelector((state)=>state.login)


function handlechange(e){
const set=e.target.name
const value=!data[set]
const tutorid=tutorinfo.UID
dispatch(toggle({set:set,value:value,auth:tutorid,id:data._id}))
}

function changetutor(e){
   
dispatch(settutor({tutorid:e.target.value,id:data._id,auth:tutorinfo.UID}))
}

function changedate(e){
   dispatch(setdate({value:e.target.value,id:data._id,auth:tutorinfo.UID}))
}

 return (
    <div className='modal-trial'>
        <div className='modal-layer'>
            <div className='modal-control'>
                <h1>{data.name} <span onClick={()=>{dispatch(closemodal())}}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg></span></h1>
                <p>Registration date {data.date}</p>
                <div >Mark as contacted <input checked={data.contacted} name='contacted' type='checkbox' onChange={handlechange}/></div>
                <div >Highlight <input checked={data.checked} name='checked' type='checkbox' onChange={handlechange}/></div>
                <div >Mark as done <input checked={data.completed} name='completed' type='checkbox' onChange={handlechange}/></div>
                <div>Set meeting date <input onChange={changedate}  type='date' value={data.meetingdate}/></div>
           {tutorinfo.rank ==='admin'  ?  <div className='assign-teacher'>
                <div>Assign teacher</div>
               <select onChange={changetutor} value={data.tutorid} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
  <option  value=''>Set teacher</option>
 { tutors.map((elem,index)=> <option key='index' value={elem.pk}>{elem.name}</option>)}
</select></div> : null}
               {tutorinfo.rank ==='admin'  ?  <div><div className="btn btn-danger" onClick={()=>{dispatch(deletetrial({id:data._id,auth:tutorinfo.UID}));dispatch(closemodal())}}>Delete trial</div></div>:null}
            </div>
        </div>

 </div>)
}


export default Modal

