import { create } from "zustand";
import { createAuthSlice } from "./Slices/auth-slices.js";
import { createChatSlice } from "./Slices/chat-slice.js";

export const userAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));