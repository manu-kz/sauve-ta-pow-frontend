import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { articles: [], entireArticle: null },
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    importArticles: (state, action) => {
        state.value.articles = []
        for(let article of action.payload) {
            state.value.articles.push(article)
        }
    },
    // updateEmail: (state, action: PayloadAction<string>) => {
    //   state.value.email = action.payload;
    // },
    openArticle: (state, action) => {
      state.value.entireArticle = action.payload
    },
    closeArticle: (state, action) => {
      state.value.photos = state.value.photos.filter((data) => data !== action.payload);
    },
    
  },
});

export const { importArticles, openArticle, closeArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
