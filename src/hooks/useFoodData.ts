import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { FoodData } from '../interface/foodData';

// Durante desenvolvimento usamos o proxy /api definido no vite.config.ts
// Em produção ideal: usar variável de ambiente completa (ex: import.meta.env.VITE_API_URL)
const fetchFoods = async (): Promise<FoodData[]> => {
    const { data } = await axios.get<FoodData[]>('/api/foods');
    return data;
};

export function useFoodData() {
    return useQuery<FoodData[]>({
        queryKey: ['food-data'],
        queryFn: fetchFoods,
        retry: 2,
        staleTime: 60_000, // 1 min evita refetch desnecessário
    });
}