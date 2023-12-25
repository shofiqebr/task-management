import { useContext, useState } from "react";
import { ContextProvider } from "../provider/AuthProvider";
import useAllTodo from "../hook/useAllToDo";
import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import { ClearIcon } from '@mui/icons-material/Clear';


const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: '7px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Profile = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user } = useContext(ContextProvider);
    const [todoData] = useAllTodo();
    // const ownData = todoData.filter(item => item.email === user.email);
    const ownData = Array.isArray(todoData) ? todoData.filter(item => item.email === user.email) : [];
    const ownTodo = ownData.filter(item => item.status == 'todo');
    const ownOnGoing = ownData.filter(item => item.status == 'onGoing');
    const ownComplete = ownData.filter(item => item.status == 'complete');
    // console.log(ownTodo,ownOnGoing,ownComplete)
    console.log(user)

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Profile</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className=''>
                            <div className='flex justify-end'>
                                <IconButton onClick={handleClose} aria-label="delete">
                                    <ClearIcon></ClearIcon>
                                </IconButton>

                            </div>
                            <div>
                                <div className='flex gap-y-3 justify-center flex-col items-center'><img className="w-32 rounded-full" src={user.photoURL} alt="img" />
                                    <h1 className='text-2xl font-semibold text-gray-600'>{user.displayName}</h1>
                                </div>
                                <div className='lg:flex hidden justify-center items-center gap-10'>
                                    <div className='py-3 w-96 h-72 overflow-y-auto px-5 bg-pink-200'>
                                        <h1 className='text-xl font-semibold text-gray-600 text-center mb-3'>TODO</h1>
                                        {
                                            ownTodo.map(item => <div key={item._id}>
                                                <div className='border rounded-md border-gray-400 my-2 shadow-lg px-3 py-2'>
                                                    <div className="flex justify-between items-center">
                                                        <h1 className="text-center flex-1 text-xl uppercase font-semibold text-gray-700">{item.title}</h1>
                                                    </div>
                                                    <p className="text-gray-600 my-3">{item.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <p>Deadline: {item.deadline}</p>
                                                        <p className="font-semibold text-gray-600 uppercase">{item.priority}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            )
                                        }
                                    </div>
                                    <div className='py-3 h-72 w-96 overflow-y-auto px-5 bg-pink-200'>
                                        <h1 className='text-xl font-semibold text-gray-600 text-center mb-3'>ON GOING</h1>
                                        {
                                            ownOnGoing.map(item => <div key={item._id}>
                                                <div className='border rounded-md border-gray-400 my-2 shadow-lg px-3 py-2'>
                                                    <div className="flex justify-between items-center">
                                                        <h1 className="text-center flex-1 text-xl uppercase font-semibold text-gray-700">{item.title}</h1>
                                                    </div>
                                                    <p className="text-gray-600 my-3">{item.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <p>Deadline: {item.deadline}</p>
                                                        <p className="font-semibold text-gray-600 uppercase">{item.priority}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            )
                                        }
                                    </div>
                                    <div className='py-3 h-72 w-96 overflow-y-auto px-5 bg-pink-200'>
                                        <h1 className='text-xl font-semibold text-gray-600 text-center mb-3'>COMPLETED</h1>
                                        {
                                            ownComplete.map(item => <div key={item._id}>
                                                <div className='border rounded-md border-gray-400 my-2 shadow-lg px-3 py-2'>
                                                    <div className="flex justify-between items-center">
                                                        <h1 className="text-center flex-1 text-xl uppercase font-semibold text-gray-700">{item.title}</h1>
                                                    </div>
                                                    <p className="text-gray-600 my-3">{item.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <p>Deadline: {item.deadline}</p>
                                                        <p className="font-semibold text-gray-600 uppercase">{item.priority}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default Profile;