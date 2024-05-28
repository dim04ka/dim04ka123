import { useState, useEffect } from 'react'
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firestore/config'
import { GAMES } from '../consts'
import { IInfoGame, IGame } from '../interface';
export const useGames = (): { games: IInfoGame[], loading: boolean, deleteGame: (id: string) => void, addGame: (game: IInfoGame) => void } => {
  const [games, setGames] = useState<IInfoGame[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const loadGames = async () => {

    // const doc = collection(db, GAMES)



    // const querySnapshot = await getDocs(doc)
    // const projects = querySnapshot.docs.map(doc => ({ ...doc.data() }));
    // // console.log(projects)
    // // setGames(projects as IInfoGame[])
    // console.log('=====', projects)




    setLoading(true)
    const items: IInfoGame[] = []
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc: any) => {
      items.push({ id_doc: doc.id, ...doc.data() });
    });
    setGames(items);
    setLoading(false)
  }


  const deleteGame = async (id: string) => {
    try {
      await deleteDoc(doc(db, GAMES, id));
      console.log(`Document with ID ${id} deleted successfully`);
      loadGames();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };



  const addGame = async (game: IInfoGame) => {
    try {
      setLoading(true)
      await addDoc(collection(db, "todos"), game)
      setLoading(false)
    } catch (error) {
    }



  }
  useEffect(() => {
    loadGames()
  }, [])

  return { games, loading, deleteGame, addGame }

}

export default useGames