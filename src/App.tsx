import {useMemo, useState} from 'react'; // 1. Импортируем хуки
import { useAppDispatch, useAppSelector } from "../store"; // Используем наши хуки
import { onAdd, onDelete, setMainNews, type NewsType } from "../store/slices/newsSlice";
import './App.css'

function App() {
    const dispatch = useAppDispatch();
    const newsList = useAppSelector(state => state.news.news); // Читаем список новостей

    const [info, setInfo] = useState("");
    const [type, setType] = useState<NewsType>("low"); // Начальное значение - строка

    const [sortMethod, setSortMethod] = useState<'time' | 'type' | 'random'>('random');

    const handleSortNewsByTime = () => {
        setSortMethod(prev => prev === 'time' ? 'random' : 'time');
    };

    const handleSortNewsByType = () => {
        setSortMethod(prev => prev === 'type' ? 'random' : 'type');
    };

    const handleAddNews = () => {
        if (info.trim() === "") return; // Защита от пустого ввода

        dispatch(onAdd({
            id: crypto.randomUUID(), // Генерируем уникальный ID
            info: info,
            type: type,
            time: Date.now(),
            main: false,
        }));

        setInfo(""); // Очищаем поле после добавления
    }

    const handleNewsEdit = () => {

    }

    const sortedNews = useMemo(() => {
        return [...newsList].sort((a, b) => {

            const priority = {high: 3, medium: 2, low: 1}

            //sort for pinned news
            if (a.main !== b.main) {
                return a.main ? -1 : 1;
            }
            //sort by time
            if(sortMethod === 'time') {
                return b.time - a.time;
            }
            //sort by type
            if(sortMethod === 'type') {
                return priority[b.type] - priority[a.type];
            }

            //random sort
            if(sortMethod === 'random') {
                // eslint-disable-next-line react-hooks/purity
                return Math.random() - 0.5;
            }

            return 0;
        })
    }, [newsList, sortMethod]);

    return (
        <div className="flex flex-col p-10 gap-5 text-white bg-slate-900 min-h-screen">
            <h1 className="font-bold text-5xl text-center">Your news</h1>
            <div className="flex flex-col gap-2 justify-center items-center gap-5">
                <input
                    className='border-2 border-white p-2 bg-transparent rounded w-1/3'
                    type="text"
                    value={info}
                    onChange={(event) => setInfo(event.target.value)} // 2. Исправлено SetInfo -> setInfo
                    placeholder="Input new news"
                />

                <div className="flex gap-6">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as NewsType)}
                        className="bg-slate-700 p-2 rounded"
                    >
                        <option value="low">Low Importance</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button
                        onClick={handleAddNews}
                        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 cursor-pointer"
                    >
                        Add
                    </button>
                    <button
                        onClick={handleSortNewsByTime}
                        className={`px-4 py-2 rounded cursor-pointer
                        ${sortMethod === 'time' ? 'bg-purple-950' : 'bg-purple-600'}`}
                    >
                        Sort by time
                    </button>
                    <button
                        onClick={handleSortNewsByType}
                        className={`px-4 py-2 rounded cursor-pointer
                        ${sortMethod === 'type' ? 'bg-lime-900' : 'bg-lime-600'}`}
                    >
                        Sort by type
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">News List:</h2>
                {sortedNews.map(item => (
                    <div key={item.id} className="border border-slate-700 rounded-xl flex gap-6">
                        <span className={`font-bold py-3 w-30 text-center rounded-xl 
                        ${!item.main ? 'text-black' : 'text-white'} 
                        ${item.type === 'high' ? 'bg-red-500' : ''}
                        ${item.type === 'medium' ? 'bg-orange-500' : ''}
                        ${item.type === 'low' ? 'bg-green-500' : ''}`}>
                            {item.type.toUpperCase()}
                        </span>
                        <div className="flex justify-between w-full items-center">
                            <span>{item.info}</span>
                            <div className="flex h-full">
                                <span className="font-bold flex items-center px-3">{new Date(item.time).toLocaleTimeString()}</span>
                                <span className="flex items-center bg-orange-600  h-full w-15 justify-center cursor-pointer"
                                      onClick={() => dispatch(setMainNews(item.id))}
                                >
                                    {!item.main ? (<span>Pin</span>) : (<span>Unpin</span>)}
                                </span>
                                <span className="flex items-center bg-blue-600  h-full w-15 justify-center cursor-pointer"
                                      onClick={handleNewsEdit}
                                >
                                    Edit
                                </span>
                                <span className="flex items-center bg-red-600 rounded-r-xl h-full w-15 justify-center cursor-pointer"
                                      onClick={() => dispatch(onDelete(item.id))}
                                >
                                    Delete
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;