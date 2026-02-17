import './App.css'
import {useDispatch} from "react-redux";
import {onAdd} from "../store/slices/newsSlice.ts";
import {type Type} from "../store/slices/newsSlice.ts";

function App() {
    const dispatch = useDispatch()
    const [info, setInfo] = React.useState();
    const [type, setType] = React.useState<Type>(type.low);
    const handleAddNews = (info: string, type: Type) => {
        dispatch(onAdd({
                info: info,
                type: type,
            }
        ))
    }
  return (
    <div className="flex">
      <div>
        <input className='border-2 border-white' type={"text"} value={info} onChange={(event) => SetInfo(event.target.value)}/>
      </div>

      <div>

      </div>
    </div>
  )
}

export default App
