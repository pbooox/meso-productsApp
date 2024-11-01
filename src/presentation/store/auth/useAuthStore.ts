import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authLogin } from "../../../actions/auth/auth";

// creamos la interface para el estado
export interface AuthState {
    status: AuthStatus,
    token?: string;
    user?: User;

    // funcion de login que hicimos en /actions/auth/auth.ts
    login: (email: string, password: string) => Promise<Boolean>;
}

export const useAuthStore =  create<AuthState>()( (set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        if( !resp ) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        // TODO: Guardar el token  y usuario en el storage del dispositivo
        console.log({ resp })
        set({ status: 'authenticated', token: resp.token, user: resp.user })
        return true;
    }
}))