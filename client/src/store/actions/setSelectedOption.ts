
export enum ChosenOptions {
    DASHBOARD,
    NEW_PLACE,
    NO_PLACES,
    PLACE_MANAGEMENT,
    MY_ACCOUNT,
    NEW_BUSINESS_CHAIN
}

export const setSelectedOption = (option: ChosenOptions) => {
    return {
        type: 'SET_SELECTED_OPTION',
        payload: option
    }
}