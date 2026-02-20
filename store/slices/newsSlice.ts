import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NewsType = 'low' | 'medium' | 'high';

export interface News {
    id: string;
    info: string;
    type: NewsType;
    time: number;
    main: boolean;
}

interface NewsSliceState {
    news: News[];
}

const savedNews = localStorage.getItem("user_news");

const initialState: NewsSliceState = {
    // Initialize empty array
    news: savedNews ? JSON.parse(savedNews) : [],
}
//for giving 3 properties on reducer because we can put only 2
interface EditPayload{
    id: string;
    newInfo: string;
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        onAdd: (state, action: PayloadAction<News>) => {
            // Name must be same NewsSliceState (news, but not 'list')
            state.news.push(action.payload);
            localStorage.setItem("user_news", JSON.stringify(state.news));
        },

        onDelete: (state, action: PayloadAction<string>) => {
            state.news = state.news.filter(n => n.id !== action.payload);
            localStorage.setItem("user_news", JSON.stringify(state.news));
        },
        setMainNews: (state, action: PayloadAction<string>) => {
            const item = state.news.find(n => n.id === action.payload);

            if(item){
                item.main = !item.main;
                console.log(`${item.info} - ${item.main}`);
            }

            localStorage.setItem("user_news", JSON.stringify(state.news));
        },
        onEdit: (state, action: PayloadAction<EditPayload>) => {
            //initialize typ EditPayload
            const {id, newInfo} = action.payload;

            //search current element by ID
            const item = state.news.find(n => n.id === id);

            if(item) {
                //set new info
                item.info = newInfo;
            }

            localStorage.setItem('user_news', JSON.stringify(state.news));
        },
    },
});

export const { onAdd, onDelete, setMainNews, onEdit} = newsSlice.actions;
export default newsSlice.reducer;