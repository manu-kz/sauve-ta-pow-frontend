import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState,
	reducers: {
		addBookmark: (state, action) => {
			state.value.push(action.payload);
		},
		removeBookmark: (state, action) => {
			state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title);
		},
		importBookmarks: (state, action) => {
			// state.value = []
			// for(let favori of action.payload) {
			// 	state.value.push(favori)
			// }
			state.value = action.payload
		},
	},
});

export const { addBookmark, removeBookmark, importBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;