

export interface IItem {
    id: string,
    children?: IItem[],
    colIndex?:number,
    colSpan?:number,
    rowIndex?:number,
    rowSpan?:number,
    cellFieldVal?:{
        [index:string]:any,
    },
    cellFields?:{
        [index:string]:any,
    },
}

export type IFlattenedItem = IItem & { ancestorIds: string[] }