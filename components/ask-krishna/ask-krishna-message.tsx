import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface AskKrishnaMessageProps {
  message: string
  isUser: boolean
  timestamp: string
}

export function AskKrishnaMessage({ message, isUser, timestamp }: AskKrishnaMessageProps) {
  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <Avatar>
        {isUser ? (
          <AvatarFallback>U</AvatarFallback>
        ) : (
          <>
            <AvatarImage src="/assets/gita/images/krishna-avatar.png" />
            <AvatarFallback>K</AvatarFallback>
          </>
        )}
      </Avatar>

      <div className={cn("rounded-lg p-3 max-w-[80%]", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <p className="text-sm">{message}</p>
        <p className={cn("text-xs mt-1", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {format(new Date(timestamp), "h:mm a")}
        </p>
      </div>
    </div>
  )
}
