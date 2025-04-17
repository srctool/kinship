import { ActionIcon, AppShell, Box, Input, Stack, Switch } from "@mantine/core";
import { PropsWithChildren } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Search,
} from "lucide-react";
import { useAppShell } from "@/stores";
import PersonView from "@/modules/person/person-view";

const Layout = ({ children }: PropsWithChildren) => {
  const { asideOpened, asideToggle, navOpened, navToggle } = useAppShell();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !navOpened,
          desktop: !navOpened,
        },
      }}
      padding="xl"
      aside={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !asideOpened,
          desktop: !asideOpened,
        },
      }}>
      <AppShell.Header>Header</AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap={8}>
          <Input
            placeholder="Search"
            rightSection={<Search size={20} />}
          />
          <Switch label="Edit Mode" />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main pos="relative">
        <Box
          w="100%"
          pos="absolute"
          left={0}
          style={{
            zIndex: 1000,
            paddingRight: "var(--app-shell-aside-offset)",
            paddingLeft: "var(--app-shell-navbar-offset)",
            justifyContent: "space-between",
          }}
          top="var(--app-shell-header-offset)"
          display="flex">
          <ActionIcon
            onClick={navToggle}
            variant="subtle">
            {navOpened ? <PanelLeftClose /> : <PanelLeftOpen />}
          </ActionIcon>
          <ActionIcon
            onClick={asideToggle}
            variant="subtle">
            {asideOpened ? <PanelRightClose /> : <PanelRightOpen />}
          </ActionIcon>
        </Box>
        {children}
      </AppShell.Main>
      <AppShell.Aside>
        <PersonView  />
      </AppShell.Aside>
    </AppShell>
  );
};

export default Layout;
