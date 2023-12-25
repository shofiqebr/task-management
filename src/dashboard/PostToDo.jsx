import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useAxiosPublic from "../hook/useAxiosPublic";
import { ContextProvider } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import ClearIcon from '@mui/icons-material/Clear';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Backdrop, Box, Button, Container, CssBaseline, Fade, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import useAllTodo from "../hook/useAllToDo";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};


const PostToDo = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [, refetch] = useAllTodo();

    const { handleSubmit, control } = useForm();
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(ContextProvider);
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);

        const todoData = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            email: user.email,
            status: 'todo',
        }
        axiosPublic.post('/all-todo', todoData)
            .then(res => {
                if (res.data.acknowledged) {
                    setLoading(false)
                    refetch()
                    toast.success('create a todo')
                }
            })

    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Create Task</Button>
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
                    <div>
                        <Box sx={style}>
                        <div className='flex justify-end'>
                            <IconButton onClick={handleClose} aria-label="delete">
                            <ClearIcon></ClearIcon>
                            </IconButton>
                            
                        </div>
                            <Container component="main" maxWidth="md">
                                <CssBaseline />
                                <div className="mt-8">
                                    <Typography variant="h4" align="center" gutterBottom>
                                        Task Form
                                    </Typography>
                                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 md:w-auto w-[250px]">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Controller
                                                    name="title"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label="Title"
                                                            variant="outlined"
                                                            fullWidth
                                                            required
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label="Description"
                                                            variant="outlined"
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            required
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Controller
                                                    name="deadline"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label="Deadline"
                                                            type="date"
                                                            variant="outlined"
                                                            fullWidth
                                                            required
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth variant="outlined" required>
                                                    <InputLabel>Priority</InputLabel>
                                                    <Controller
                                                        name="priority"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <Select {...field} label="Priority">
                                                                <MenuItem value="low">Low</MenuItem>
                                                                <MenuItem value="moderate">Moderate</MenuItem>
                                                                <MenuItem value="high">High</MenuItem>
                                                            </Select>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        {loading ?
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                sx={{ marginTop: '20px' }}
                                            >
                                                <div className='animate-spin'><HourglassTopIcon></HourglassTopIcon></div>
                                            </Button> :
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                sx={{ marginTop: '20px' }}
                                            >
                                                Create Task
                                            </Button>
                                        }
                                    </form>
                                </div>
                            </Container>
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default PostToDo;