import Group from "@/types/group.model";

// export interface ChatContextType {
//   groups: Group[];
//   selectedGroupId: number | null;
//   selectGroup: (groupId: number) => void;
// }
export interface ChatContextType {
  isFirstLoadGroup: boolean;
  groups: Group[];
  selectedGroupId: number | null;
  selectGroup: (groupId: number) => void;
  loadMoreMessages: () => Promise<void>;
  hasFirstLoadedMessages: (groupId: number) => boolean;
}
