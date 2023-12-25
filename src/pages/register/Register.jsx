import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ContextProvider } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.confog";
import toast from "react-hot-toast";
// import { Container } from "postcss";
import { Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";



const Register = () => {

    const { handleSubmit, control } = useForm();
    const {createUser} = useContext(ContextProvider);
    const navigate = useNavigate()
   

    const onSubmit =(data) => {
        createUser(data.email,data.password)
        .then(result=> {
            if(result.user){
                updateProfile(auth.currentUser,{
                    displayName: data.Name,
                    photoURL: data.photo,
                }).then(()=> {
                    toast.success('Sign Up Successfully')
                    navigate('/')
                })
                .catch(error=> {
                    if(error.message){
                        toast.error(error.message)
                    }
                })
                
            }
        })
        .catch(error=> {
            if(error.message){
                toast.error(error.message)
            }
        })
        
    }



    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="mt-8">
                    <Typography component="h1" variant="h4" sx={{ fontWeight: "700", color: 'gray' }} className="text-center">
                        Sign up
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="Name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="photo"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Photo URL"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email Address"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '20px' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end" className="mt-2">
                            <Grid item>
                                <Link to="/login" className="text-blue-500 hover:underline">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Register;