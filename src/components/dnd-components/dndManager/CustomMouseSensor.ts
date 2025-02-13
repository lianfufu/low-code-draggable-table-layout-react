//
//
// import {MouseSensor, MouseSensorOptions} from '@dnd-kit/core';
// import type {MouseEvent} from 'react';
// enum MouseButton {
//     RightClick = 2,
// }
// export class CustomMouseSensor extends MouseSensor {
//     static activators = [
//         {
//             eventName: 'onMouseDown' as const,
//             handler: (
//                 {nativeEvent: event}: MouseEvent,
//                 {onActivation}: MouseSensorOptions
//             ) => {
//                 if (event.button === MouseButton.RightClick) {
//                     return false;
//                 }
//
//                 onActivation?.({event});
//
//                 return true;
//             },
//         },
//     ];
// }
//
// function shouldHandleDrag(element) {
//     let current = element;
//     while (current) {
//         if (current.dataset?.noDrag) return false;
//         current = current.parentElement;
//     }
//     return true;
// }


import type {MouseEvent} from 'react';
import {getOwnerDocument} from '@dnd-kit/utilities';

import {MouseSensor, SensorProps} from "@dnd-kit/core";
import {
    MouseSensorOptions,
    PointerEventHandlers,
    AbstractPointerSensorOptions,
} from '@dnd-kit/core';
import {AbstractPointerSensor} from "@dnd-kit/core/dist/sensors";

const events: PointerEventHandlers = {
    move: {name: 'mousemove'},
    end: {name: 'mouseup'},
};

enum MouseButton {
    RightClick = 2,
}


export type MouseSensorProps = SensorProps<MouseSensorOptions>;

// export class MouseSensor extends AbstractPointerSensor {
//     constructor(props: MouseSensorProps) {
//         super(props, events, getOwnerDocument(props.event.target));
//     }
//
//     static activators = [
//         {
//             eventName: 'onMouseDown' as const,
//             handler: (
//                 {nativeEvent: event}: MouseEvent,
//                 {onActivation}: MouseSensorOptions
//             ) => {
//                 if (event.button === MouseButton.RightClick) {
//                     return false;
//                 }
//
//                 onActivation?.({event});
//
//                 return true;
//             },
//         },
//     ];
// }


export class CustomMouseSensor extends  MouseSensor {
    static activators = [
        {
            eventName: 'onMouseDown',
            handler: ({ nativeEvent: event }: MouseEvent) => {
                return shouldHandleDrag(event.target);
            },
        },
    ];
}

function shouldHandleDrag(element:any) {
    let current = element;
    while (current) {
        if (current.dataset?.noDrag) return false;
        current = current.parentElement;
    }
    return true;
}