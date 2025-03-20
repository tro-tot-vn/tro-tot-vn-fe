// import React, { useState, useEffect, ReactNode } from "react";
// import messageListener from "@/services/message-listener";
// import Message from "@/types/message.model";
// import { MessageContext } from "./message-provider.context";

// export const MessageProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [messages, setMessages] = useState<Message[]>([]);  

//   useEffect(() => {
//     const handleNewMessage = (msg: Message) => {
//       console.log("New message received: ", msg);
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     };

//     messageListener.on("message", handleNewMessage);

//     return () => {
//       messageListener.off("message", handleNewMessage);
//     };
//   }, []);

//   return (
//     <MessageContext.Provider value={{ messages }}>
//       {children}
//     </MessageContext.Provider>
//   );
// };
