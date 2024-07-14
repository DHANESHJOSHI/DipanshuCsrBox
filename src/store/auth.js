import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let initialState = {
  isAuth: false,
  user: null,
  teamMembers: [], // Add teamMembers to initial state if it isn't already included
};

export const useAuthStore = create()(
  devtools(
    persist(
      (set) => ({ 
        auth: initialState,
        signIn: (user) =>
          set(() => ({
            auth: { ...initialState, isAuth: true, user: user, teamMembers: user.members || [] },
          })),
        signOut: () => set(() => ({ auth: initialState })),
        updateTeamMembers: (newMember) =>
          set((state) => ({
            auth: {
              ...state.auth,
              teamMembers: [...state.auth.teamMembers, newMember],
            },
          })),
      }),
      {
        name: "auth",
        getStorage: () => sessionStorage,
      }
    )
  )
);
