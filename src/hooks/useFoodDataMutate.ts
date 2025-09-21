import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FoodData } from '../interface/foodData';

// Durante desenvolvimento usamos o proxy /api definido no vite.config.ts
// Em produção ideal: usar variável de ambiente completa (ex: import.meta.env.VITE_API_URL)
const postData = async (data: FoodData): Promise<any> => {
    const response = await axios.post('/api/foods', data);
    return response;
};

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data']})

        }
    });

    return mutate;
}