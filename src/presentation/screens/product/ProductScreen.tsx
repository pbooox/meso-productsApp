import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { MainLayout } from '../../layouts/MainLayout';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Product, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';
import { updateCreateProduct } from '../../../actions/products/update-create-product';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex]


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {

  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();

  // useQuery
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  // useMutation, para hacer la actualizacion del producto
  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess: (data: Product) => {
      console.log('success');
    }
  })

  // si aun no encuentra producto mostrara el titulo de cargando
  if (!product) {
    return (<MainLayout title="Cargando..." />)
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={(values: any) => mutation.mutate(values)}
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <MainLayout
            title={values.title}
            subTitle={`Precio:${values.price}`}
          >
            <ScrollView style={{ flex: 1 }}>
              {/* imagenes del producto */}
              <Layout>
                <FlatList
                  data={values.images}
                  keyExtractor={(item) => item}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <FadeInImage
                      uri={item}
                      style={{ width: 300, height: 300, marginHorizontal: 7 }}
                    />
                  )}
                />
              </Layout>

              {/* formulario */}
              <Layout style={{ marginHorizontal: 10 }}>
                <Input
                  label="Título"
                  style={{ marginVertical: 5 }}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                <Input
                  label="Slug"
                  style={{ marginVertical: 5 }}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                />
                <Input
                  label="Descripción"
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
              </Layout>

              <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                <Input
                  label="Precio"
                  style={{ flex: 1 }}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                />
                <Input
                  label="Inventario"
                  style={{ flex: 1 }}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                />
              </Layout>

              {/* selectores */}
              <ButtonGroup
                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                size="small"
                appearance="outline"
              >
                {
                  sizes.map((size) => (
                    <Button
                      onPress={() => setFieldValue(
                        'sizes',
                        values.sizes.includes(size)
                          ? values.sizes.filter((s: any) => s !== size)
                          : [...values.sizes, size]
                      )}
                      key={size}
                      style={{
                        flex: 1,
                        backgroundColor: values.sizes.includes(size)
                          ? theme['color-primary-200']
                          : undefined
                      }}
                    >
                      {size}
                    </Button>
                  ))
                }

              </ButtonGroup>
              <ButtonGroup
                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                size="small"
                appearance="outline"
              >
                {
                  genders.map((gender) => (
                    <Button
                      // seteamos el valor del campo
                      onPress={() => setFieldValue('gender', gender)}
                      key={gender}
                      style={{
                        flex: 1,
                        backgroundColor: values.gender.startsWith(gender)
                          ? theme['color-primary-200']
                          : undefined
                      }}
                    >
                      {gender}
                    </Button>
                  ))
                }

              </ButtonGroup>

              {/* boton de guardar */}
              <Button
                accessoryLeft={<MyIcon name="save-outline" white />}
                onPress={() => handleSubmit()}
                style={{ margin: 15 }}
              >
                Guardar
              </Button>

              <Text>{JSON.stringify(values, null, 2)}</Text>
              <Layout style={{ height: 200 }} />
            </ScrollView>
          </MainLayout>
        )
      }

    </Formik>

  )
}

