import { Controller, useForm } from "react-hook-form";
import useAllTodo from "../hook/useAllToDo";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";
import ClearIcon from '@mui/icons-material/Clear';
import { Button, CssBaseline, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { Container } from "postcss";
import { HourglassTopIcon } from '@mui/icons-material/HourglassTop';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditTask = ({handleClose,open, updateData}) => {
    // console.log(updateData)

    const [, refetch] = useAllTodo();

    const { handleSubmit, control } = useForm();
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);

        const todoData = {
            title: data.title,
            id: updateData._id,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
        }
        axiosPublic.patch('/one-todo', todoData)
            .then(res => {
                if (res.data.acknowledged) {
                    setLoading(false)
                    refetch()
                    toast.success('update the todo')
                }
            })

    };

    return (
        <div>
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
                    <div className='flex justify-end'>
                            <IconButton onClick={handleClose} aria-label="delete">
                            <ClearIcon></ClearIcon>
                            </IconButton>
                            
                        </div>
                        <Container component="main" maxWidth="md">
                            <CssBaseline />
                            <div className="mt-8">
                                <Typography variant="h4" align="center" gutterBottom>
                                   Edit Task 
                                </Typography>
                                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 md:w-auto w-[250px]">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Controller
                                                name="title"
                                                control={control}
                                                defaultValue={updateData.title}
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
                                                defaultValue={updateData.description}
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
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Deadline"
                                                        type="date"
                                                        defaultValue={updateData.deadline}
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
                                                    defaultValue={updateData.priority}
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
                </Fade>
            </Modal>
        </div>
    );
};

export default EditTask;