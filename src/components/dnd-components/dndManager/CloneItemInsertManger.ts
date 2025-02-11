//用于控制左侧区域拖入右侧区域的复制插入

import { IItem } from "./DNDDataTypes.ts"

export default function cloneInsertActiveItem(
    items: IItem[],
    clonedItem:IItem,
    overId: string,
    overIndex: number,
    insertIntoChildren: boolean
): IItem[] {
    console.log("执行到了复制逻辑");
    let hasOverId = false
    let newItems = items.map((item): IItem & { isActive?: boolean } => {
        if (item.id === overId) {
            hasOverId = true
        }
        return {
            ...item,
            children: item.children
                ? cloneInsertActiveItem(
                    item.children,
                    clonedItem,
                    overId,
                    overIndex,
                    insertIntoChildren
                )
                : item.children,
        }
    })

    if (hasOverId) {
        const overItemIndex = newItems.findIndex((item) => item.id === overId)
        const overItem = newItems.find((item) => item.id === overId)
        if(!insertIntoChildren){
            if (overItemIndex === 0) {
                newItems.unshift(clonedItem)
            } else if (overItemIndex > -1) {
                newItems.splice(overItemIndex + 1,0,clonedItem);
            }
        }else{
            overItem!.children=[clonedItem];
        }

    }else{
        if(overId==="zero"){
            newItems=[clonedItem];
        }
    }

    return newItems;
}

