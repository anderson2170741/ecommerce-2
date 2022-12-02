import { createSlice} from '@reduxjs/toolkit'

export const isLoandingSlice = createSlice({
    name: 'isLoading',
    initialState: true,
    reducers: {
        setIsLoading: (state, action) => {
            return action.payload
        }   
    }
})

export const { setIsLoading } = isLoandingSlice.actions;

export default isLoandingSlice.reducer;