import { createSlice} from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    UID:"",
    loading:false,
    rank:'',
    publickey:''
}

export const login=createAsyncThunk('login/log',(cred)=>{
     return  fetch('https://data.mongodb-api.com/app/application-0-sbswq/endpoint/login',{
       method:"POST" ,
       headers:{"Content-Type":"application/json",
    "Accept":'application/json'},
    body:JSON.stringify(cred)
    
    }).then(r=>r.json()).then(r=>{return r}).catch(err=>err)

})

const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
       logout:(state)=>{
        localStorage.setItem('UID','')
        state.UID=""
       }
    },
    extraReducers:{
        [login.pending]:(state)=>{
            state.loading=true
        },
        [login.fulfilled]:(state,action)=>{
            state.loading=false;
           
            state.UID=action.payload._id? action.payload._id : ""
            state.publickey=action.payload.publickey? action.payload.publickey : ""
            state.rank=action.payload.rank? action.payload.rank: ""
        },
        [login.rejected]:(state)=>{
            state.loading=false
        }
    }
})


export default loginSlice