
import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: []
    },

    reducers: {
        addPost: function(state, action) {
            console.log('(postSlice.js) items:', action);
            console.log('(postSlice.js) items action payload:', action.payload);
            console.log('(postSlice.js) Entery id:', action.payload.id);
            state.items.push(action.payload)
        },

        deletePost: function(state, action) {
            console.log('(postSlice.js) postSlice', action.payload.id );
            state.items = state.items.filter(item => item.id !== action.payload.id )
        },

        updatePost: function(state, action) {
            state.items.map(item => {
                if (item.id == action.payload.id) {
                    item.title = action.payload.title;
                    item.description = action.payload.description;
                    console.log('postSlice edited title: ', item.title);
                    console.log('postSlice edited description: ', item.description);

                };
            })
        }

    },

});


export const {addPost, deletePost, updatePost} = postsSlice.actions;
export default postsSlice.reducer;