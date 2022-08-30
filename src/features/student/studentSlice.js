import { createSlice } from "@reduxjs/toolkit"

// 1. Setup slice
// 2. Import di store
// 3. Isi initial state dengan dummy data
// 4. Render data
// 5. Setup form
// 6. Feature add data

const initialState = {
  data: [
    {
      name: "Seto",
      gender: "Male",
      course: "UI/UX"
    },
    {
      name: "Doraemon",
      gender: "Male",
      course: "Web Development"
    }
  ],
}

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      let newStudent = {
        name: action.payload.name,
        gender: action.payload.gender,
        course: action.payload.course,
      }

      state.data.push(newStudent)
    }
  },
})
export const { addStudent } = studentSlice.actions

export default studentSlice.reducer

