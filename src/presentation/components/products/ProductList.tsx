import { Layout, List, ListItem, Text } from "@ui-kitten/components"
import { Product } from "../../../domain/entities/product"
import { ProductCard } from "./ProductCard"

interface Props {
  products: Product[]
}

export const ProductList = ({ products }: Props) => {

  const renderItem = ({ item }: any): React.ReactElement => (
    <ProductCard product={item} />
  );

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}

      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
    />
  )
}

