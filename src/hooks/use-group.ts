import { ChatContext } from "@/components/providers/chat-provider/chat-provider.context";
import { useContext } from "react";

export function useChatContext() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useGroupContext must be used within a GroupProvider");
    }
    return context;
}