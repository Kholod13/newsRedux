import {useMemo, useState} from 'react';
import { useAppDispatch, useAppSelector } from "../store";
import {onAdd, onDelete, setMainNews, type NewsType, type News, onEdit} from "../store/slices/newsSlice";
import './App.css'

function App() {
    const dispatch = useAppDispatch();
    const newsList = useAppSelector(state => state.news.news); // Read news list

    const [info, setInfo] = useState("");
    const [type, setType] = useState<NewsType>("low"); // Starter value - string

    //modal
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditId, setIsEditId] = useState<News>();
    const [editName, setEditName] = useState("");

    const [sortMethod, setSortMethod] = useState<'time' | 'type' | 'random'>('random');

    const handleSortNewsByTime = () => {
        setSortMethod(prev => prev === 'time' ? 'random' : 'time');
    };

    const handleSortNewsByType = () => {
        setSortMethod(prev => prev === 'type' ? 'random' : 'type');
    };

    const handleAddNews = () => {
        if (info.trim() === "") return; // catch empty input

        dispatch(onAdd({
            id: crypto.randomUUID(), // Generate individual ID
            info: info,
            type: type,
            time: Date.now(),
            main: false,
        }));

        setInfo(""); // Clear input
    }

    const handleNewsEdit = (item:News, value: string) => {
        if(value !== null && value.trim() !== ''){
            dispatch(onEdit({
                id: item.id,
                newInfo: value,
            }))
        }
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
                    onChange={(event) => setInfo(event.target.value)}
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
                                      onClick={() => {setIsEditId(item); setIsOpen(true); setEditName(item.info)}}
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
            {isOpen && (
                // Фиксированный контейнер на весь экран (fixed inset-0)
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    {/* Контентное окно */}
                    <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 text-white">
                        <h2 className="text-2xl font-bold mb-4">Editing news</h2>
                        <div className="text-slate-300 mb-6">
                            <input type={'text'} value={editName} onChange={(e) => setEditName(e.target.value as NewsType)}
                            className='w-full border border-slate-700 rounded p-2'/>
                        </div>

                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (isEditId) {
                                        handleNewsEdit(isEditId, editName);
                                    }
                                    setIsOpen(false);
                                }}
                                className="bg-blue-600 px-5 py-2 rounded-xl"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default App;