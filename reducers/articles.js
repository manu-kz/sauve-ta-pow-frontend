import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { articles: [], entireArticle: null },
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    importArticles: (state, action) => {
        state.value.articles = action.payload
    },
    openArticle: (state, action) => {
      state.value.entireArticle = action.payload
    },
  },
});

export const { importArticles, openArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
