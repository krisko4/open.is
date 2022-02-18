
export enum Status {
    OPEN = 'open',
    CLOSED = 'closed'
}

export interface Image {
    img: string,
    file: File | null
}
export interface CurrentPlaceProps {
    status?: Status,
    visitCount?: number,
    businessId?: string,
    _id?: string,
    name: string,
    address: string,
    type: string | null,
    lat: number,
    lng: number,
    description: string,
    subtitle: string,
    phone: string,
    logo: string | ArrayBuffer | null | File,
    email: string,
    images: Image[],
    website: string,
    instagram: string,
    news?: NewsProps[],
    opinions?: OpinionProps[],
    facebook: string,
    userId?: string,
    visits?: VisitProps[],
    alwaysOpen?: boolean,
    averageNote?: {
        ones: number,
        twos: number,
        threes: number,
        fours: number,
        fives: number,
        average: number
    },
    openingHours?: any,
    isActive?: boolean,
    isUserOwner?: boolean,
    isUserSubscriber?: boolean
}

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
}

interface NewsProps {
    title: string,
    date: string,
    content: string
}

export interface LocationProps {
    _id?: string,
    address: string,
    lat: number,
    lng: number,
    phone: string,
    isValid?: boolean,
    email: string,
    website: string,
    instagram: string,
    news?: NewsProps[],
    opinions?: OpinionProps[],
    facebook: string,
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

interface OpinionProps {
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