import { createContext, useReducer } from "react";
import GAME_DATA from "../../utils/data";

export const DataContext = createContext();

const FALLBACK = { "Home": { "title": "Home", "raw": "" } }

const reducer = (state, action) => {
  const { type, payload } = action
  const newState = JSON.parse(JSON.stringify(state))
  let scene = newState.data[state.selected]
  switch (type) {
    case "select":
      newState.selected = payload
      return newState
    case "path":
      newState.path = payload || (newState.path.length > 1 ? newState.path.slice(0, newState.path.length - 1) : ["Home"])
      return newState
    case "delete":
      const deleteScene = (scene, payload, path) => {
        if (path.length === 1) {
          delete scene.subPages[path[0]]
          return scene
        }
        scene.subPages[path[0]] = deleteScene(
          scene.subPages[path[0]],
          payload,
          path.slice(1)
        )

        return scene
      }
      newState.data[newState.selected] = deleteScene(
        newState.data[newState.selected],
        payload,
        newState.path
      )
      return newState
    case "createChild":
      const createChild = (scene, payload, path) => {
        if (path.length === 0) {
          return {
            ...scene,
            subPages: {
              ...scene.subPages,
              [payload]: {
                title: payload,
                raw: "",
                subPages: {}
              }
            }
          }
        }

        scene.subPages[path[0]] = createChild(
          scene.subPages[path[0]],
          payload,
          path.slice(1)
        )

        return scene
      }
      newState.data[newState.selected] = createChild(
        newState.data[newState.selected],
        payload,
        newState.path
      )
      return newState
    case "createSibling":
      const createSibling = (scene, payload, path) => {
        if (path.length === 1) {
          return {
            ...scene,
            subPages: {
              ...scene.subPages,
              [payload]: {
                title: payload,
                raw: "",
                subPages: {}
              }
            }
          }
        }
        scene.subPages[path[0]] = createSibling(
          scene.subPages[path[0]],
          payload,
          path.slice(1)
        )
        return scene
      }
      newState.data[newState.selected] = createSibling(
        newState.data[newState.selected],
        payload,
        newState.path
      )
      return newState
    case "update":
      const modScene = (scene, payload, path) => {
        if (path.length === 0) {
          return {
            ...scene,
            ...payload
          }
        }
        scene.subPages[path[0]] = modScene(
          scene.subPages[path[0]],
          payload,
          path.slice(1)
        )

        return scene
      }
      newState.data[newState.selected] = modScene(
        newState.data[newState.selected],
        payload,
        newState.path
      )
      return newState
    default:
      return state
  }
}

const getListOfPages = (data) => {
  if (!data) return [];
  const result = Object.keys(data.subPages)
    .map((page) => {
      const subPages = getListOfPages(data.subPages[page])
      if (!subPages.length) return [page];
      return [page, ...subPages.map(subPage => page + "/" + subPage)]
    })
    .flat();
  return result;
};

const getData = (data, path, n = 0) => {
  if (path.length === 0) return data
  if (!data.subPages[path[0]]) return data
  return getData(data.subPages[path[0]], path.slice(1), n + 1)
}

const DataProvider = ({ children }) => {
  const [{ data, selected, path }, dataDispatcher] = useReducer(
    reducer,
    {
      data: GAME_DATA,
      selected: undefined,
      path: ["Home"]
    },
  )

  let selectedData = FALLBACK
  if (selected) {
    selectedData = getData(data[selected], path)
  }

  return <DataContext.Provider
    value={{ gameData: data[selected], data: selectedData, path: path, listOfPages: getListOfPages(data[selected]), dataDispatcher }}
  >
    {children}
  </DataContext.Provider >
}

export default DataProvider