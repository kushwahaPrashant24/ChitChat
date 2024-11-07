import { create } from "zustand";
import { createAuthSlice } from "./Slices/auth-slices.js";

export const userAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
}));