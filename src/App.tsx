import { useState } from 'react'; // 1. Импортируем хуки
import { useAppDispatch, useAppSelector } from "../store"; // Используем наши хуки
import { onAdd, type NewsType } from "../store/slices/newsSlice";

function App() {
    const dispatch = useAppDispatch();
    const newsList = useAppSelector(state => state.news.news); // Читаем список новостей

    const [info, setInfo] = useState("");
    const [type, setType] = useState<NewsType>("low"); // Начальное значение - строка

    const handleAddNews = () => {
        if (info.trim() === "") return; // Защита от пустого ввода

        dispatch(onAdd({
            id: crypto.randomUUID(), // Генерируем уникальный ID
            info: info,
            type: type,
        }));

        setInfo(""); // Очищаем поле после добавления
    }

    return (
        <div className="flex flex-col p-10 gap-5 text-white bg-slate-900 min-h-screen">
            <h1>sldf</h1>
            <div className="flex gap-2">
                <input
                    className='border-2 border-white p-2 bg-transparent rounded'
                    type="text"
                    value={info}
                    onChange={(event) => setInfo(event.target.value)} // 2. Исправлено SetInfo -> setInfo
                    placeholder="News content"
                />

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
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
                >
                    Add News
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">News List:</h2>
                {newsList.map(item => (
                    <div key={item.id} className="p-3 border border-slate-700 rounded flex justify-between">
                        <span>{item.info}</span>
                        <span className={`font-bold ${item.type === 'high' ? 'text-red-500' : 'text-green-500'}`}>
                            [{item.type}]
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;