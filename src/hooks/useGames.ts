import { useState, useEffect } from 'react'
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firestore/config'
import { GAMES } from '../consts'
import { IInfoGame, Item } from '../interface';


export const useGames = (): { games: IInfoGame[], loading: boolean, deleteGame: (id: string) => void, addGame: (game: IInfoGame) => void, updateGame: (id: string, item: Item) => void } => {
  const [games, setGames] = useState<IInfoGame[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const loadGames = async () => {
    try {
      setLoading(true)
      const items: IInfoGame[] = []
      const querySnapshot = await getDocs(collection(db, GAMES));
      querySnapshot.forEach((doc: any) => {
        items.push({ id_doc: doc.id, ...doc.data(), playersWithRole: doc.data().playersWithRole });
      });
      setGames(items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }


  const deleteGame = async (id: string) => {
    try {
      setLoading(true)
      await deleteDoc(doc(db, GAMES, id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
      loadGames()
    }
  };

  const addGame = async (game: IInfoGame) => {
    try {
      setLoading(true)
      await addDoc(collection(db, GAMES), game)
      setLoading(false)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
      loadGames()
    }
  }

  const updateGame = async (id: string, item: Item) => {
    try {
      setLoading(true)
      const game = games.filter(game => game.id_doc === id)[0]
      const updatedGame = {
        ...game,
        playersWithRole: game.playersWithRole.map((player: Item) => {
          if (player.id === item.id) {
            return item
          }
          return player
        })
      }
      const taskDocRef = doc(db, GAMES, id)
      await updateDoc(taskDocRef, {
        ...updatedGame
      })

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
      loadGames()
    }
  }

  useEffect(() => {
    loadGames()
  }, [])

  return { games, loading, deleteGame, addGame, updateGame }

}

export default useGames