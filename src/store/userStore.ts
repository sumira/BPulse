import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: string;
  deviceId: string;
  setUserId: (userId: string) => void;
  setDeviceId: (deviceId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: '',
      deviceId: '',
      setUserId: (userId: string) => set({ userId }),
      setDeviceId: (deviceId: string) => set({ deviceId }),
    }),
    {
      name: 'user-storage',
    }
  )
);