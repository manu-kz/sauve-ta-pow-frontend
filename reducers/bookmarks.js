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
			state.value = action.payload
		},
		removeAllBookmarks: (state) => {
			state.value = []
		}
	},
});

export const { addBookmark, removeBookmark, importBookmarks, removeAllBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;