//news(time)
//important(small, middle, important
//sort of time and important level
//funcs: delete news, add news, edit news, turn on ma

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Type {
    low;
    medium;
    high;
}

interface News {
    info: string;
    type: Type;
}

interface NewsSlice {
    news: News[];
}

const savedNews = localStorage.getItem("user_news");

const initialState: NewsSlice = {
    news: savedNews ? JSON.parse(savedNews) : null,
}

const newsSlice = createSlice({
    name: 'news',
    initialState,

    reducers: {
        sortByTime: () => {

        },
        sortByType: () => {

        },
        setMainNews: () => {

        },
        onAdd: (state, action: PayloadAction<News>) => {
            state.list.push(action.payload);

            localStorage.setItem("user_news", JSON.stringify(state.list));
        },
        onDelete: () => {

        },
        onEdit: () => {

        },
    },
});

export const { Type, onAdd } = newsSlice.actions;

export default newsSlice;