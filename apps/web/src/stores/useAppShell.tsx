import { create } from 'zustand';

export type AppShellActionProps = {
  navToggle: () => void;
  asideToggle: () => void;
};

export type AppShellStateProps = {
  navOpened: boolean;
  asideOpened: boolean;
};

export type AppShellProps = AppShellStateProps & AppShellActionProps;

export const useAppShell = create<AppShellProps>((set) => ({
  navOpened: true,
  asideOpened: true,
  navToggle: () => set((state) => ({ navOpened: !state.navOpened })),
  asideToggle: () => set((state) => ({ asideOpened: !state.asideOpened })),
}));
