import { createContext  , useState} from 'react'

const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [loading , setLoading] = useState(true);
    const [posts , setPosts] = useState([]);
    const [apiData , setApiData] = useState(null)
    const [login, setLogin] = useState(false)


    const states = {
        loading, setLoading,
        posts, setPosts,
        apiData, setApiData,
        login, setLogin
    }

    return <AppContext.Provider value={states}>
        { children }
    </AppContext.Provider>
}

export { AppContext }