

export interface IItem {
    id: string
    children?: IItem[]
}

export type IFlattenedItem = IItem & { ancestorIds: string[] }