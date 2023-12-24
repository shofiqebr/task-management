import { Button } from "@mui/material";
import { Link } from "react-router-dom";



const Banner = () => {
        
     

    return (
        <div className="bg-[url('https://i.ibb.co/r7d14Gm/objectives-1262376-1280.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat flex justify-end">
            <div className="mt-[445px] mr-40 ">
                {
                    
                        <Link to='/dashboard'>
                            <Button sx={{ padding: '15px 40px', fontSize: '1.5rem', backgroundColor: '#6D214F',  }} variant="contained">Let's visit</Button>
                        </Link>
                }
            </div>
        </div>
    );
};

export default Banner;