import KanbanBoard from "./KanbanBoard";
import PostToDo from "./PostToDo";
import Profile from "./Profile";





const Dashboard = () => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center gap-5 my-5 px-10 rounded-full w-fit mx-auto border-2 py-5 items-center">
                <PostToDo></PostToDo>
                <Profile></Profile>
                
            </div>
            <KanbanBoard></KanbanBoard>
            
        </div>
    );
};

export default Dashboard;