import React, { Component } from "react";
import {
    ListItemText,
    ListItemIcon,
    IconButton,
    ListItemSecondaryAction
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import withHocs from "../Tasks/TasksHoc";

import EditIcon from "@material-ui/icons/Edit";
import CheckboxBlankIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined';
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)"
    })
});

const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

class DraggableList extends Component {
    constructor({ items }) {
        super({ items });

        this.state = { items };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({items});
    }

    getOnSwitch(itemId) {
        const self = this;
        return () => {
            const items = this.state.items
                .map(item => item.id === itemId ? {...item, done: !item.done} : item)
            self.setState({items});
        }
    }

    // getOnOpen(itemId) {
    //     const self = this;
    //     return () => {}
    // }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (<DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                        <MenuList style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <MenuItem
                                            ContainerComponent="li"
                                            ContainerProps={{ ref: provided.innerRef }}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <ListItemIcon>
                                                {item.done ?
                                                    <CheckboxIcon onClick={this.getOnSwitch(item.id)} /> :
                                                    <CheckboxBlankIcon onClick={this.getOnSwitch(item.id)} />
                                                }
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.primary}
                                                secondary={item.secondary}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </MenuItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </MenuList>
                    </RootRef>
                )}
            </Droppable>
        </DragDropContext>);
    }
}

export default withHocs(DraggableList)