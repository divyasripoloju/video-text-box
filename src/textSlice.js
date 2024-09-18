import { createSlice } from '@reduxjs/toolkit';

const textSlice = createSlice({
  name: 'text',
  initialState: [],
  reducers: {
    addText: (state, action) => {
      state.push(action.payload);
    },
    updateText: (state, action) => {
      const index = state.findIndex((textBox) => textBox.id === action.payload.id);
      if (index !== -1) {
        state[index].config = action.payload.config;
      }
    },
    deleteText: (state, action) => {
      return state.filter((textBox) => textBox.id !== action.payload);
    },
  },
});

export const { addText, updateText, deleteText } = textSlice.actions;
export default textSlice.reducer;
