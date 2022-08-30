import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      // console.log(action)
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    overwriteValue: (state, action) => {
      state.value = action.payload
    },
  },
})

// Actions adalah function yang akan return sebuah "ACTION OBJECT"
// "ACTION OBJECT"
//  - type
//  - payload (optional)

// Reducer adalah kumpulan conditions yang akan mengubah isi global state
// setiap condition dari reducer akan ngecek "type" dari ACTION OBJECT
// Yang artinya perubahan isi global state, akan ditentukan
// berdasarkan type action object yang dikirim ke reducer

// Nama function di reducer/action akan menjadi nama type di reducer
// untuk mengganti isi store

// contoh: ada function namanya increment dalam sebuah slice bernama "counter"
// maka type akan menjadi "counter/increment"

export const { increment, decrement, reset, overwriteValue } =
  counterSlice.actions

export default counterSlice.reducer
