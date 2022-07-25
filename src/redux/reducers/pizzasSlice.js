import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  isLoading: false,
}

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.items = action.payload
    },
    setLoaded: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setPizzas, setLoaded } = pizzaSlice.actions

export default pizzaSlice.reducer
