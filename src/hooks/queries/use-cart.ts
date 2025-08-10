import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";

export const getUseCartQueryKey = () => ["cart"] as const;

export const useCart = () => {
     return useQuery({
        queryKey: getUseCartQueryKey(), //Fiz isso para não precisar repetir código e se importar essa USE_CART_QUERY_KEY, para que toda alteração eu não precise mexer em todo o código
        queryFn: () => getCart(),
      });
}