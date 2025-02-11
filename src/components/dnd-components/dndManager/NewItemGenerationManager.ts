//用于控制中间区域的内容拖拽移动

import { IItem, IFlattenedItem } from './DNDDataTypes.ts'

let ActiveItem: IItem | null = null

export function findActiveItem(items: IItem[], activeId: string):IItem|null {
    for (const item of items) {
        if (item.id === activeId) {
            ActiveItem = { ...item }
            return item; // 找到目标项，直接返回
        }
        if (item.children) {
            const found = findActiveItem(item.children, activeId); // 递归查找子项
            if (found) {
                return found; // 如果在子项中找到目标项，返回结果
            }
        }
    }
    return null; // 未找到目标项，返回 null
}

function insertActiveItem(
    items: IItem[],
    activeId: string,
    activeIndex: number,
    overId: string,
    overIndex: number,
    insertFirst: boolean,
    isInsertIntoChildren:boolean
): IItem[] {
    let hasOverId = false
    const newItems = items.map((item): IItem & { isActive?: boolean } => {
        if (item.id === activeId) {
            return { ...item, isActive: true } // 标记 active 以便后面 filter
        }
        if (item.id === overId) {
            hasOverId = true
        }
        return {
            ...item,
            children: item.children
                ? insertActiveItem(
                    item.children,
                    activeId,
                    activeIndex,
                    overId,
                    overIndex,
                    insertFirst,
                    isInsertIntoChildren
                )
                : item.children,
        }
    })

    if (hasOverId && ActiveItem) {
        const overItemIndex = newItems.findIndex((item) => item.id === overId)
        const overItem = newItems.find((item) => item.id === overId)
        if(!isInsertIntoChildren){
            if (overItemIndex === 0 && insertFirst) {
                newItems.unshift(ActiveItem)
            } else if (overItemIndex > -1) {
                const startIndex =
                    activeIndex < overIndex ? overItemIndex + 1 : overItemIndex
                newItems.splice(startIndex, 0, ActiveItem)
            }
        }else{
            overItem!.children=[ActiveItem];
        }
    }

    return newItems.filter((item) => !item.isActive)
}

export default function genNewItems(
    items: IItem[],
    flattenedItems: IFlattenedItem[],
    activeId: string,
    overId: string,
    isInsertIntoChildren:boolean
): IItem[] {
    const activeIndex = flattenedItems.findIndex((i) => i.id === activeId)
    const overIndex = flattenedItems.findIndex((i) => i.id === overId)

    const insertFirst = false

    // 1. Find the active item
    ActiveItem = null
    findActiveItem(items, activeId)
    if (ActiveItem === null) {
        return items
    }

    // 2. Insert the active item into the new position, and return the new items
    const newItems = insertActiveItem(
        items,
        activeId,
        activeIndex,
        overId,
        overIndex,
        insertFirst,
        isInsertIntoChildren
    )

    // 3. Return the new items
    return newItems
}
