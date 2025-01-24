import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchItems = createAsyncThunk('items/fetchItems', async (item) => {
    const response = await axios.get("https://wesoftin-backend.vercel.app/users?sort=asc");
    console.log("response :", response);
    return response.data;
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const response = await axios.post("https://wesoftin-backend.vercel.app/users", item);
    return response.data;
});

export const updateItem = createAsyncThunk('items/updateItem', async ({ id, item }) => {
    const response = await axios.put(`https://wesoftin-backend.vercel.app/users/${id}`, item);
    return response.data;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
    await axios.delete(`https://wesoftin-backend.vercel.app/users/${id}`);
    return id;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items[index] = action.payload;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export default itemsSlice.reducer;