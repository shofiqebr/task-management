import styled from "styled-components";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useContext, useState } from "react";
import { ContextProvider } from "../provider/AuthProvider";
import useAllTodo from "../hook/useAllToDo";
import toast from "react-hot-toast";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import EditTask from "./EditTask";



const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;


function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
      ? props.isBacklog
        ? "#F2D7D5"
        : "#DCDCDC"
      : props.isBacklog
        ? "#F2D7D5"
        : "#EAF4FC";
}

export default function Task({ task, index }) {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(ContextProvider)
  const [, refetch] = useAllTodo()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateData, setUpdateData] = useState({});

  const handleDelete = id => {
    axiosPublic.delete(`/delete-task?id=${id}&email=${user.email}`)
      .then(res => {
        if (res.data.acknowledged) {
          refetch()
          toast.success('delete successfully')
        }
        if (res.data.message == false) {
          toast.error("You did't create it")
        }
      })
  }

  const handleLoadTask = id => {
         setUpdateData({});
        axiosPublic.get(`/todo-data/${id}`)
        .then(res=> {
           setUpdateData(res.data);
        })
  }



  return (
    <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-center flex-1 text-xl uppercase font-semibold text-gray-700">{task.title}</h1>
              <div className="flex items-center gap-3">
                <div onClick={() => handleDelete(task._id)}>
                  <IconButton >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </div>
                <div>
                  <div onClick={()=>handleLoadTask(task._id)}>
                    <IconButton variant="contained" onClick={handleOpen}>
                      <EditIcon></EditIcon>
                    </IconButton>
                  </div>

                  <EditTask open={open} updateData={updateData} handleClose={handleClose}></EditTask>
                </div>
              </div>
            </div>
            <p className="text-gray-600 my-3">{task.description}</p>
            <div className="flex justify-between items-center">
              <p>Deadline: {task.deadline}</p>
              <p className="font-semibold text-gray-600 uppercase">{task.priority}</p>
            </div>
          </div>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}