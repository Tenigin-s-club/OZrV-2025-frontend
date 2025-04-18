import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Chat } from "@/types";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { uiActions, uiSelectors } from "@/store/ui";
import { useSelector } from "react-redux";

export function AppSidebar({ items }: { items: Chat[] }) {
  const dispatch = useAppDispatch();
  const currentChatId = useSelector(uiSelectors.getChatOpened);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Чаты</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    className={item.id === currentChatId ? "bg-[#e9e9e9]" : ""}
                    onClick={() => dispatch(uiActions.setChatOpened(item.id))}
                    asChild
                  >
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
