import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    trials:[],
    tutors:[],
    selected:'',
    loading:false,
    filter:"All"
}

export const gettrials=createAsyncThunk('dashboard/gettrials',()=>{
    return fetch('https://data.mongodb-api.com/app/application-0-sbswq/endpoint/gettrials').then(r=>r.json()).then(r=>r)
})

export const gettutors=createAsyncThunk('dashboard/gettutors',()=>{
    return fetch('https://data.mongodb-api.com/app/application-0-sbswq/endpoint/gettutors').then(r=>r.json()).then(r=>r)
})

export const deletetrial=createAsyncThunk('dashboard/deletetrial',(data)=>{
    
    return fetch(`https://data.mongodb-api.com/app/application-0-sbswq/endpoint/deletetrial?id=${data.id}&auth=${data.auth}`,{
    method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
   
}).then(r=>r.json()).then(r=>r)
})


export const toggle=createAsyncThunk('dashboard/toggle',(data)=>{
    
    return fetch('https://data.mongodb-api.com/app/application-0-sbswq/endpoint/toggle',{
    method:'PUT',
    headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)  
}).then(r=>r.json()).then(r=>r)
})

export const settutor=createAsyncThunk('dashboard/settutor',(data)=>{
    
    return fetch('https://data.mongodb-api.com/app/application-0-sbswq/endpoint/settutor',{
    method:'PUT',
    headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)  
}).then(r=>r.json()).then(r=>r)
})

export const setdate=createAsyncThunk('dashboard/setdate',(data)=>{
    
    return fetch('https://data.mongodb-api.com/app/application-0-sbswq/endpoint/setdate',{
    method:'PUT',
    headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)  
}).then(r=>r.json()).then(r=>r)
})

const dashboard=createSlice({
name:'dashboard',
initialState,
reducers:{
setfilter:((state,action)=>{
state.filter=action.payload
})
},
extraReducers:{
[gettrials.pending]:(state)=>{
    state.loading=true
},
[gettrials.fulfilled]:(state,action)=>{
state.loading=false

state.trials=action.payload
},
[gettrials.rejected]:(state)=>{
    state.loading=false
},
[gettutors.pending]:(state)=>{
    state.loading=true
},
[gettutors.fulfilled]:(state,action)=>{
state.loading=false

state.tutors=action.payload
},
[gettutors.rejected]:(state)=>{
    state.loading=false
},
[deletetrial.pending]:(state)=>{
    state.loading=true
},
[deletetrial.fulfilled]:(state,action)=>{
state.loading=false
state.trials=state.trials.filter((elem)=>elem._id !== action.payload)

},
[deletetrial.rejected]:(state)=>{
    state.loading=false
},
[toggle.pending]:(state)=>{
    state.loading=true
},
[toggle.fulfilled]:(state,action)=>{
    state.trials.find((elem)=> elem._id===action.payload.id )[action.payload.set]=action.payload.value
    state.loading=false


},
[toggle.rejected]:(state)=>{
    state.loading=false
},
[settutor.pending]:(state)=>{
    state.loading=true
},
[settutor.fulfilled]:(state,action)=>{
    state.trials.find((elem)=> elem._id===action.payload.id ).tutorid=action.payload.tutorid
    state.loading=false


},
[settutor.rejected]:(state)=>{
    state.loading=false
},
[setdate.pending]:(state)=>{
    state.loading=true
},
[setdate.fulfilled]:(state,action)=>{
    console.log(action.payload)
     state.trials.find((elem)=> elem._id===action.payload.id ).meetingdate=action.payload.value
    state.loading=false


},
[setdate.rejected]:(state)=>{
    state.loading=false
}
}
})
export const {setfilter} = dashboard.actions
export default dashboard