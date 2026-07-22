export const initialStore = () => {
  return {
    characters: [], // Aquí guardaremos los personajes de Rick and Morty
    locations: [],  // Aquí las ubicaciones
    episodes: [],   // Aquí los episodios
    favorites: []   // Aquí los favoritos que guarde el usuario
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };

    case 'add_favorite':
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'delete_favorite':
      return {
        ...store,
        favorites: store.favorites.filter((fav) => fav !== action.payload)
      };

    case 'set_locations':
      return {
        ...store,
        locations: action.payload
      };

    case 'set_episodes':
      return {
        ...store,
        episodes: action.payload
      };


    default:
      throw Error('Unknown action.');
  }
}
