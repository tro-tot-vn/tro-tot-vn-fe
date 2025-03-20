// import { useEffect, useState } from "react";
// import Message from "@/types/message.model";
// import messageService from "@/services/message-listener";
// import Group from "@/types/group.model";
// import { chatService } from "@/services/group-service";
// import { ChatContextType } from "./chat-provider.types";
// import { Member } from "@/types/member.model";

// function useGroupModel(): ChatContextType {
//   const [isFirstLoadGroup, setFirstLoadGroup] = useState<boolean>(false);

//   const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

//   const [loadedMessageGroups, setLoadedMessageGroups] = useState<Set<number>>(
//     new Set()
//   );
//   const [groups, setGroups] = useState<Group[]>([]);

//   const firstLoadGroups = async () => {
//     try {
//       const fetchedGroups = await chatService.getGroupList(-1, 20);
//       for (let i = 0; i < fetchedGroups.length; i++) {
//         const group = fetchedGroups[i];
//         for (const message of group.messages) {
//           const memberData = await chatService.getInfoMember(
//             group.groupId,
//             message.userId
//           );
//           if (memberData) {
//             fetchedGroups[i] = {
//               ...group,
//               members: [memberData],
//             };
//           } else {
//             console.warn("Member From Message Is Not Found: ", message);
//           }
//         }
//       }
//       setGroups(() => {
//         return fetchedGroups;
//       });
//     } catch (error) {
//       console.error("Lỗi khi tải nhóm chat:", error);
//     }
//     setFirstLoadGroup(false);
//   };

//   useEffect(() => {
//     setFirstLoadGroup(true);

//     firstLoadGroups();

//     const handleNewMessage = async (messages: Message[]) => {
//       messages.forEach(async (message) => {
//         message.createAt = new Date(message.createAt);
//         setGroups((prevGroups) => {
//           const updatedGroups = [...prevGroups];
//           const groupIndex = updatedGroups.findIndex(
//             (g) => g.groupId === message.groupId
//           );

//           if (groupIndex !== -1) {
//             const group = updatedGroups[groupIndex];
//             (async () => {
//               const senderData = (await chatService.getInfoMember(
//                 group.groupId,
//                 message.userId
//               )) as Member | null;
//               if (senderData) {
//                 // Use another updater callback to merge in the new message.
//                 setGroups((currentGroups) => {
//                   const groupsCopy = [...currentGroups];
//                   const foundIndex = groupsCopy.findIndex(
//                     (g) => g.groupId === message.groupId
//                   );
//                   if (foundIndex !== -1) {
//                     const currentGroup = groupsCopy[foundIndex];
//                     groupsCopy[foundIndex] = {
//                       ...currentGroup,
//                       messages: [message, ...currentGroup.messages],
//                     };
//                   }
//                   return groupsCopy;
//                 });
//               } else {
//                 console.warn("Member From Message Is Not Found: ", message);
//               }
//             })();
//           } else {
//             // Group not found: fetch it and then add as new group.
//             (async () => {
//               const newGroup = await chatService.getInfoGroup(message.groupId);
//               if (!newGroup) {
//                 console.log("Group not found for message", message);
//                 return;
//               }
//               const senderData = (await chatService.getInfoMember(
//                 newGroup.groupId,
//                 message.userId
//               )) as Member | null;
//               if (senderData) {
//                 const groupToAdd: Group = {
//                   ...newGroup,
//                   messages: [message],
//                   members: [senderData],
//                 };
//                 // Append the new group using the latest state.
//                 setGroups((currentGroups) => [...currentGroups, groupToAdd]);
//               } else {
//                 console.warn("Member From Message Is Not Found: ", message);
//               }
//             })();
//           }
//           // Return updatedGroups immediately; actual state updates occur in async callbacks.
//           return updatedGroups;
//         });
//       });
//     };
//     messageService.on("message", handleNewMessage);

//     return () => {
//       messageService.off("message", handleNewMessage);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const selectGroup = (groupId: number) => {
//     setSelectedGroupId(groupId);
//     if (!loadedMessageGroups.has(groupId)) {
//       (async () => {
//         try {
//           // Replace this dummy call with your actual API call to load messages
//           const gr = groups.find((g) => g.groupId === groupId);
//           const newMessages = await chatService.getMessageList(
//             groupId,
//             gr ? (gr.messages.length > 0 ? gr.messages[0].messageId : -1) : -1,
//             50
//           );
//           setGroups((prevGroups) => {
//             const updatedGroups = prevGroups.map((g) => {
//               if (g.groupId === groupId) {
//                 return {
//                   ...g,
//                   messages: [...g.messages, ...newMessages],
//                 };
//               }
//               return g;
//             });
//             return updatedGroups;
//           });
//           // Mark this group as fully loaded
//           setLoadedMessageGroups((prev) => new Set(prev).add(groupId));
//           // Assume that after full load, we check if more messages are available.
//         } catch (error) {
//           console.error(`Error loading messages for group ${groupId}:`, error);
//         }
//       })();
//     }
//   };

//   // Check if the selected group's messages have already been fully loaded
//   const hasFirstLoadedMessages = (): boolean => {
//     if (selectedGroupId === null) return false;
//     return loadedMessageGroups.has(selectedGroupId);
//   };

//   const loadMoreMessages = async () => {
//     if (selectedGroupId === null) return;

//     try {
//       const gr = groups.find((g) => g.groupId === selectedGroupId);
//       const cursor = gr
//         ? gr.messages.length > 0
//           ? gr.messages[0].messageId
//           : -1
//         : -1;

//       console.log("Groups", groups);
//       const newMessages = await chatService.getMessageList(
//         selectedGroupId,
//         cursor,
//         20
//       );
//       setGroups((prevGroups) => {
//         const updatedGroups = prevGroups.map((g) => {
//           if (g.groupId === selectedGroupId) {
//             return {
//               ...g,
//               messages: [...g.messages, ...newMessages],
//             };
//           }
//           return g;
//         });
//         return updatedGroups;
//       });
//       // Mark this group as fully loaded
//       // For demo purposes, we set 'canLoadMore' to false.
//     } catch (error) {
//       console.error(
//         `Error loading messages for group ${selectedGroupId}:`,
//         error
//       );
//     }
//   };

//   return {
//     isFirstLoadGroup,
//     loadMoreMessages,
//     hasFirstLoadedMessages,
//     groups,
//     selectedGroupId,
//     selectGroup,
//   };
// }

// export default useGroupModel;
