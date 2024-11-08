import { useNavigation } from "@react-navigation/native";
import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/MyIcon";

interface Props {
  title: string;
  subTitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;
  children: React.ReactNode;
}
export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children }
): Props => {

  // traeremos el espacio que tenemos arriba para evitar tener problemas con el notch
  const { top } = useSafeAreaInsets();

  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => {
    return (
      <TopNavigationAction
        icon={<MyIcon name="arrow-back-outline" />}
        onPress={goBack}
      />
    )
  }

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;

    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<MyIcon name={rightActionIcon} />}
      />
    )
  }
  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: '100%' }}>
        {children}
      </Layout>
    </Layout>
  )
}
