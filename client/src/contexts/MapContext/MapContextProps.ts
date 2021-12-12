
export default interface MapContextProps {
    mapCenter? : number[],
    mapZoom? : number,
    popupOpen? : boolean,
    isMarkerDraggable: boolean,
    setMapCenter? : React.Dispatch<React.SetStateAction<number[]>>,
    setMapZoom? : React.Dispatch<React.SetStateAction<number>>,
    setPopupOpen? : React.Dispatch<React.SetStateAction<boolean>>
}