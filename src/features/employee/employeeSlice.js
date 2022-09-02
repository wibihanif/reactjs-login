import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  currentEmployee: {
    name: "",
    email: "",
    password: "",
    id: 0,
  },
}

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fillEmployeeList: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { fillEmployeeList } = employeeSlice.actions

export default employeeSlice.reducer

