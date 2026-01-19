import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import {
  ClientSideSuspense,
  useInboxNotifications,
} from "@liveblocks/react/suspense";
import { BellIcon } from "lucide-react";

export const Inbox = () => {
  return (
    <ClientSideSuspense fallback={<BellSkelton />}>
      <InboxMenu />
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="size-5" />
            {inboxNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-6 bg-border" />
    </>
  );
};

const BellSkelton = () => {
  return (
    <>
      <Button disabled variant="ghost" size="icon" className="relative">
        <BellIcon className="size-5" />
      </Button>
      <div className="w-px h-6 bg-border" />
    </>
  );
};
