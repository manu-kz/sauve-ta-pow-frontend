import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { number: 0, articles: [] },
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
        // for(let article of action.payload) {
        //     state.value.articles.push(article)
        // }
        // const store = state.value.articles
        // const fetch = action.payload
        // if(!store){
        //     for(let article of fetch) {
        //         store.push(article)
        //     }
        // } else {
        //     let filtre =  fetch.filter(object1 => {
        //         return !store.some(object2 => {
        //         return object1.title === object2.title;
        //         });
        //     })
            
        //     for(let article of filtre) {
        //         store.push(article)
        //     }
        // }
    },
    importNumber: (state, action) => {
        state.value.number = action.payload
    }
    // updateEmail: (state, action: PayloadAction<string>) => {
    //   state.value.email = action.payload;
    // },
    // addPhoto: (state, action: PayloadAction<string>) => {
    //   state.value.photos.push(action.payload);
    // },
    // removePhoto: (state, action: PayloadAction<string>) => {
    //   state.value.photos = state.value.photos.filter((data) => data !== action.payload);
    // },
    
  },
});

export const { importArticles, importNumber } = articlesSlice.actions;
export default articlesSlice.reducer;
