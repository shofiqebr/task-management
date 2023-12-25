import { useState } from "react";
import useAllTodo from "../hook/useAllToDo";
import useAxiosPublic from "../hook/useAxiosPublic";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { CircularProgress } from "@mui/material";




export default function KanbanBoard() {
    const axiosPublic = useAxiosPublic();
    const [todoData, refetch] = useAllTodo();
    const [isTrue,setIsTrue] = useState(false);

    // const todo = todoData.filter(item => item.status == 'todo');
    // const onGoing = todoData.filter(item => item.status == 'onGoing');
    // const complete = todoData.filter(item => item.status == 'complete');
    const todo = Array.isArray(todoData) ? todoData.filter(item => item.status == 'todo') : [];
    const onGoing = Array.isArray(todoData) ? todoData.filter(item => item.status == 'onGoing') : [];
    const complete = Array.isArray(todoData) ? todoData.filter(item => item.status == 'complete') : [];

    
    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        // console.log(result)
        if (source.droppableId == destination.droppableId) return;
        setIsTrue(true)

        if (destination.droppableId == 2) {
            axiosPublic.patch(`/onGoing/${draggableId}`)
                .then(res => {
                    refetch()
                    setIsTrue(false)
                    console.log(res.data)
                })
        }

        if (destination.droppableId == 3) {
            axiosPublic.patch(`/complete/${draggableId}`)
                .then(res => {
                    refetch()
                    setIsTrue(false)
                    console.log(res.data)
                })
        }

        if (destination.droppableId == 1) {
            axiosPublic.patch(`/todo/${draggableId}`)
                .then(res => {
                    refetch()
                    setIsTrue(false)
                    console.log(res.data)
                })
        }


    };



    return (
        <DragDropContext onDragEnd={handleDragEnd}>
          {
            isTrue? <div className="h-[70vh] flex items-center justify-center text-4xl"><CircularProgress /></div>:
            <div className="flex lg:flex-row gap-y-10 flex-col justify-between items-center">
            <Column title={"TO DO"} tasks={todo} id={"1"} />
            <Column title={"ON GOING"} tasks={onGoing} id={"2"} />
            <Column title={"COMPLETED"} tasks={complete} id={"3"} />
            </div>
          }
            
        </DragDropContext>
    );
}