import { closePopup, defaultCoords, initialState, mapDataReducer, resetMap, setMapCoords, setPopup, setPopupIndex } from "./mapSlice"

test('Should return initial state', () => {
    expect(mapDataReducer(undefined, { type: '' })).toEqual(initialState);
})

test('Should set map coords', () => {
    const newMapCoords = {
        zoom: 10,
        lat: 20,
        lng: 20
    }
    expect(mapDataReducer(initialState, setMapCoords(newMapCoords))).toEqual({
        ...initialState,
        mapCoords: newMapCoords
    })
})

test('Should set popup', () => {
    const newPopup = {
        isOpen: true,
        index: 5
    }
    expect(mapDataReducer(initialState, setPopup(newPopup))).toEqual({
        ...initialState,
        popup: newPopup
    })
})

test('Should set popup index', () => {
    const newPopupIndex = 10;
    expect(mapDataReducer(initialState, setPopupIndex(newPopupIndex))).toEqual({
        ...initialState,
        popup: {
            ...initialState.popup,
            index: newPopupIndex
        }
    })
})

test('Should close popup', () => {
    expect(mapDataReducer(initialState, closePopup())).toEqual({
        mapCoords: defaultCoords,
        popup: {
            ...initialState.popup,
            isOpen: false
        }
    })
})

test('Should reset map', () => {
    const state = {
        mapCoords: defaultCoords,
        popup: {
            index: 10,
            isOpen: false,
        },
    }
    expect(mapDataReducer(state, resetMap())).toEqual(initialState);
})