
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const useAllTodo = () => {
    const axiosPublic = useAxiosPublic();

    const {data: todoData = [], refetch, isLoading} = useQuery({
        queryKey:['all-todo'],
        queryFn: async ()=> {
            const res = await axiosPublic.get('/all-todo');
            return res.data;
                    
        }
    })

    return [todoData,refetch, isLoading]
};

export default useAllTodo;