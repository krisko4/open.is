
export enum Status {
    OPEN = 'open',
    CLOSED = 'closed'
}

export interface Image {
    img: string,
    file: File | null
}
export interface CurrentPlaceProps extends LocationProps {
    status?: Status,
    businessId?: string,
    _id?: string,
    name: string,
    type: string | null,
    description: string,
    subtitle: string,
    logo: string | ArrayBuffer | null | File,
    images: Image[],
    isBusinessChain? : boolean,
    userId?: string,
    isUserOwner?: boolean,
    isUserSubscriber?: boolean
}

export interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
}

export interface NewsProps {
    title: string,
    date: string,
    content: string
}

export interface ContactDetails {
    phone: string,
    email: string,
    website: string,
    facebook: string,
    instagram: string,
}

export interface LocationProps extends ContactDetails {
    _id?: string,
    address: string,
    addressId: string,
    addressLanguage: string,
    lat: number,
    lng: number,
    isValid?: boolean,
    news?: NewsProps[],
    opinions?: OpinionProps[],
    visits?: VisitProps[],
    averageNote?: {
        ones: number,
        twos: number,
        threes: number,
        fours: number,
        fives: number,
        average: number
    },
    openingHours?: any,
    alwaysOpen?: boolean,
    isActive?: boolean
    status?: Status,
    visitCount?: number,
    isUserSubscriber?: boolean
}

export interface OpinionProps {
    author: string,
    date: string,
    content: string,
    note: number,
    averageNote: number,
    authorImg: string
}

export interface RawPlaceDataProps {
    _id?: string,
    name: string,
    isBusinessChain: boolean,
    type: string | null,
    description: string,
    subtitle: string,
    logo: string | ArrayBuffer | null | File,
    images: string[] | Image[],
    locations: LocationProps[],
    userId?: string,
    isUserOwner?: boolean
}