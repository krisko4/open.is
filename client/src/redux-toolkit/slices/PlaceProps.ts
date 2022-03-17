export enum Status {
  OPEN = 'open',
  CLOSED = 'closed',
}

export interface Image {
  img: string,
  file: File | null
}

export interface AverageNoteProps {
  ones: number,
  twos: number,
  threes: number,
  fours: number,
  fives: number,
  average: number
}

export type ImageType = string | ArrayBuffer | null | File;

export interface CurrentPlaceProps extends LocationProps {
  status?: Status,
  businessId?: string,
  _id?: string,
  name: string,
  type: string | null,
  description: string,
  subtitle: string,
  logo: ImageType,
  images: Image[],
  isBusinessChain?: boolean,
  userId?: string,
  isUserOwner?: boolean,
  isUserSubscriber?: boolean,
  logoFile?: File | null
}

export interface VisitCount {
  date: string,
  visitCount: number
}

export interface VisitProps extends VisitCount {
  placeId: string,
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

export interface AddressDataProps {
  address: string,
  addressId: string,
  addressLanguage: string,
  lat: number,
  lng: number,
}

export interface LocationProps extends ContactDetails, AddressDataProps {
  _id?: string,
  isValid?: boolean,
  news?: NewsProps[],
  opinions?: OpinionProps[],
  visits?: VisitProps[],
  averageNote?: AverageNoteProps,
  openingHours?: any,
  alwaysOpen?: boolean,
  isActive?: boolean
  status?: Status,
  visitCount?: number,
  isUserSubscriber?: boolean
}
export interface Opinion {
  author: string,
  date: string,
  content: string,
  note: number,
}
export interface OpinionProps extends Opinion{
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
