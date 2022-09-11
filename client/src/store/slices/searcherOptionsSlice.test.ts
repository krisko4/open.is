import { searcherOptionsReducer, SearcherOptionsProps, setSearcherOptions, resetSearcherOptions } from "./searcherOptionsSlice";


const initialState: SearcherOptionsProps[] = [];

test('Should return the initial state', () => {
    expect(searcherOptionsReducer(undefined, {type: ''})).toEqual(initialState)
})

test('Should set searcher options', () => {
    const searcherOptions = [
        {
            name: 'option1',
            foundBy: 'name'
        },
        {
            name: 'option2',
            foundBy: 'address'
        },
    ]
    expect(searcherOptionsReducer(initialState, setSearcherOptions(searcherOptions))).toEqual(searcherOptions)
})

test('Should reset searcher options', () => {
    const searcherOptions = [
        {
            name: 'option1',
            foundBy: 'name'
        },
        {
            name: 'option2',
            foundBy: 'address'
        },
    ]
    expect(searcherOptionsReducer(searcherOptions, resetSearcherOptions())).toEqual(initialState)
})