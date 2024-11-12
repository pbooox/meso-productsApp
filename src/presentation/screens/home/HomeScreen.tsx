import { useAuthStore } from "../../store/auth/useAuthStore"
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useInfiniteQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";
import { FAB } from "../../components/ui/FAB";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";

export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { logout } = useAuthStore();

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'], // le estamos diciendo que traera productos y sera un infinite scroll
  //   staleTime: 1000 * 60 * 60, // le estamos diciendo que la data se refresque en una hora. esto lo podemos cambiar o quitar
  //   queryFn: () => getProductsByPage(0), // esta es la funcion que queremos que realice 
  // })

  // debemos cambiar los productos a data porque ahora nos devuelve
  // un array de arrays que son las paginas con productos[ [], [], [], []]
  // agregamos el fetchNextPage para cambiar de pagina
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hora
    // la primera pagina sera la 0
    initialPageParam: 0,
    // funcion asincrona que recibe los parametros de pagina
    queryFn: async (params) => {
      console.log({ params });
      // peticion que regresa los productos por pagina
      return await getProductsByPage(params.pageParam);
    },
    // como obtendremos la siguiente pagina
    getNextPageParam: (lastPage, allPages) => allPages.length,
  })

  return (
    <>
      <MainLayout
        title="TesloShop - productos"
        subTitle="Aplicación administrativa"
      >
        {
          isLoading
            ? (<FullScreenLoader />)
            : (
              <ProductList
                products={data?.pages.flat() ?? []}
                fetchNextPage={fetchNextPage}
              />
            )
        }
      </MainLayout>

      <FAB
        iconName="plus-outline"
        onPress={() => { navigation.navigate('ProductScreen', { productId: 'new' }) }}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20
        }}
      />
    </>

  )
}
