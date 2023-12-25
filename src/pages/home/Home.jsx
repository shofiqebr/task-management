import Banner from "../../Banner";
import User from "./User";
import Navbar from "./navbar";




const Home = () => {
    return (
        <div>
            home
            <Navbar></Navbar>
            <div className="mt-[55px]">
            <Banner></Banner>
            <User></User>
          
            </div>
        </div>
    );
};

export default Home;