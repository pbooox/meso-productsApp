import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";

export const updateCreateProduct = (product: Partial<Product>) => {
    
  product.stock = Number(product.stock);
  product.price = Number(product.price);

  if (product.id  && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product)

}

const updateProduct = async (product: Partial<Product>) => {
  
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);
    console.log({ checkedImages });
    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data)
    }
    throw new Error('Error al actualizar el producto')
  }
}

const createProduct = async(product: Partial<Product>) => {

  const { id, images = [], ...rest  } = product;

  try {
    const checkedImages = prepareImages(images);
  
    const { data } = await tesloApi.post(`/products/`, {
      images: checkedImages,
      ...rest
    });

    return data;
    
  } catch (error) {

    if ( isAxiosError(error) ) {
      console.log(error.response?.data);
    }
    
    throw new Error('Error al actualizar el producto');

  }
}

// 
const prepareImages = (images: string[]) => {
  // Todo: revisar los files

  // retoramos solo el nombre de las imagenes sin la url
  return images.map(
    image => image.split('/').pop()
  )
}