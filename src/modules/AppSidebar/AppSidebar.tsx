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
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { uiActions, uiSelectors } from "@/store/ui";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Loader2, MessageCirclePlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import Loader from "@/components/shared/Loader/Loader";
import { fetchLogout } from "@/store/ui/thunks";

export function AppSidebar() {
  const dispatch = useAppDispatch();
  const currentChatId = useSelector(uiSelectors.getChatOpened);
  const user = useSelector(uiSelectors.getUser);
  const requests = useSelector(uiSelectors.getRequests);
  const chats = useSelector(uiSelectors.getChats);
  return (
    <Sidebar>
      <SidebarContent className="p-4">
        {requests["getUser"] === "pending" && <Loader />}
        {requests["getUser"] !== "pending" && (
          <>
            {!user && (
              <Button
                onClick={() => dispatch(uiActions.setModalOpened("login"))}
              >
                Войти
              </Button>
            )}
            {user && (
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarFallback className="size-10 bg-[#E9E9E9] rounded-sm flex justify-center items-center">
                    {user.fio.split(" ")[0][0].toLocaleUpperCase()}
                    {user.fio.split(" ")[1][0].toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[#777] text-sm max-w-60 text-ellipsis overflow-hidden line-clamp-1">
                    Name: {user.fio}
                  </p>
                  <p className="text-[#777] text-sm max-w-60 text-ellipsis overflow-hidden line-clamp-1">
                    Email: {user.email}
                  </p>
                </div>
                <Button
                  onClick={() => fetchLogout(dispatch)}
                  className="ml-auto rounded-sm size-6 p-0"
                >
                  {requests["logout"] === "pending" ? (
                    <Loader2 className="size-2" />
                  ) : (
                    <X className="size-2" />
                  )}
                </Button>
              </div>
            )}
            <SidebarGroup>
              <SidebarGroupLabel>Чаты</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Button
                    className={cx(
                      "cursor-pointer bg-[#e9e9e9] text-black border-primary border-2 hover:text-white"
                    )}
                    onClick={() => dispatch(uiActions.setChatOpened(null))}
                    asChild
                  >
                    <span>
                      <MessageCirclePlusIcon />
                      <p>Новый чат</p>
                    </span>
                  </Button>
                  {chats.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className={cx(
                          "cursor-pointer",
                          item.id === currentChatId ? "bg-[#e9e9e9]" : ""
                        )}
                        onClick={() =>
                          dispatch(uiActions.setChatOpened(item.id))
                        }
                        asChild
                      >
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
