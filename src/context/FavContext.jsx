import { createContext,useState,useCallback,useMemo } from 'react'

const FavContext = createContext();

export function FavProvider({children}) {
  const [favs,setFavs] = useState([]);
    const toggleFav = useCallback((id)=>{
      setFavs((prev)=>{
        if(prev.includes(id))
          return prev.filter((x)=> x!==id);
        return [...prev,id];
      })
    },[setFavs]);

    const isFav = useCallback((id)=> favs.includes(id),[favs]);

    const favCount = favs.length;

    const value = useMemo(
      ()=> ({favs,toggleFav,isFav,favCount}),
      [favs,toggleFav,isFav,favCount]
    );
    
  return <FavContext.Provider value={value}>{children}</FavContext.Provider>
};
export default FavContext;
