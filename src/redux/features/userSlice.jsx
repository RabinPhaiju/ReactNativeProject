import {createSlice,PayloadAction} from "@reduxjs/toolkit"


const initialState = {
    value:[]
}

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        addUser:(state,action) => {
          state.value.push(action.payload)
      },
      removeUser:(state,action) => {
        const removedState = state.value.filter(user=>user.id!=action.payload.id)
        state.value = removedState
        return state
      }
    }
})

export const {addUser,removeUser} = usersSlice.actions

export default usersSlice.reducer