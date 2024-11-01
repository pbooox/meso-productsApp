import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { PropsWithChildren, useEffect } from "react"
import { RootStackParams } from "../navigation/StackNavigator"
import { useAuthStore } from "../store/auth/useAuthStore"

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // utilizamos la navegacion para saber a que pantalla llamaremos 
  // a la hora de verificar el estado del token
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { checkStatus, status } = useAuthStore();

  // verificaremos el estado cuando entramos a la app
  useEffect(() => {
    checkStatus();
  }, [])

  // dependiendo del estado mandaremos a home o al login
  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        })
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      }
    }
  }, [status])


  return (
    <>{children}</>
  )
}
