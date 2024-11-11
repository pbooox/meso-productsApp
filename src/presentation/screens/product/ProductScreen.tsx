import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { MainLayout } from '../../layouts/MainLayout';
import { Text } from '@ui-kitten/components';
import { useRef } from 'react';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {

  const productIdRef = useRef(route.params.productId);
  // useQuery
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  // useMutation, para hacer la actualizacion del producto

  // si aun no encuentra producto mostrara el titulo de cargando
  if (!product) {
    return (<MainLayout title="Cargando..." />)
  }

  return (
    <MainLayout
      title={product.title}
      subTitle={`Precio:${product.price}`}
    >
      <Text>Hola mundo</Text>
    </MainLayout>
  )
}

