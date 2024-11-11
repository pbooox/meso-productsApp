import { Layout, List, ListItem, Text } from "@ui-kitten/components"
import { Product } from "../../../domain/entities/product"
import { ProductCard } from "./ProductCard"

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({ products, fetchNextPage }: Props) => {

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
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}

    />
  )
}

