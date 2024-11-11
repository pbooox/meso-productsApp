import { Text } from "@ui-kitten/components"
import { useAuthStore } from "../../store/auth/useAuthStore"
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";

export const HomeScreen = () => {

  const { logout } = useAuthStore();

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'], // le estamos diciendo que traera productos y sera un infinite scroll
    staleTime: 1000 * 60 * 60, // le estamos diciendo que la data se refresque en una hora. esto lo podemos cambiar o quitar
    queryFn: () => getProductsByPage(0), // esta es la funcion que queremos que realice 
  })


  return (
    <MainLayout
      title="TesloShop - productos"
      subTitle="Aplicación administrativa"
    >
      {
        isLoading
          ? (<FullScreenLoader />)
          : <ProductList products={products} />
      }
    </MainLayout>
  )
}
