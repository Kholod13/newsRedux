import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Используем Type как объединение строк (лучше для TS)
export type NewsType = 'low' | 'medium' | 'high';

export interface News {
    id: string; // Добавим id для ключей в будущем
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
    // 2. Всегда инициализируем как пустой массив, а не null
    news: savedNews ? JSON.parse(savedNews) : [],
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        onAdd: (state, action: PayloadAction<News>) => {
            // 3. Имя свойства должно совпадать с NewsSliceState (news, а не list)
            state.news.push(action.payload);
            localStorage.setItem("user_news", JSON.stringify(state.news));
        },
        // Остальные функции пока пустые...
        onDelete: (state, action: PayloadAction<string>) => {
            state.news = state.news.filter(n => n.id !== action.payload);
            localStorage.setItem("user_news", JSON.stringify(state.news));
        },
        sortByTime: () => {

        },
        sortByType: () => {

        },
        setMainNews: (state, action: PayloadAction<string>) => {
            const item = state.news.find(n => n.id === action.payload);

            if(item){
                item.main = !item.main;
                console.log(`${item.info} - ${item.main}`);
            }

            localStorage.setItem("user_news", JSON.stringify(state.news));
        },
        onEdit: () => {

        },
    },
});

export const { onAdd, onDelete, setMainNews, onEdit, sortByType, sortByTime } = newsSlice.actions;
export default newsSlice.reducer; // 4. Экспортируем именно reducer