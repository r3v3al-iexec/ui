import type { Address, Connector } from 'wagmi';
import { create } from 'zustand';

type CreateMapState = {
  rarity: number;
  setRarity: (param: number) => void;
  durationInDays: number;
  setDurationInDays: (param: number) => void;
  poolPrize: number;
  setPoolPrize: (param: number) => void;
  pricePerGuess: number;
  setPricePerGuess: (param: number) => void;
  punkId: string;
  setPunkId: (param: string) => void;
};

export const useCreateMapStore = create<CreateMapState>((set) => ({
  rarity: 0,
  setRarity: (rarity: number) => set({ rarity }),
  durationInDays: 7,
  setDurationInDays: (durationInDays: number) => set({ durationInDays }),
  poolPrize: 0,
  setPoolPrize: (poolPrize: number) => set({ poolPrize }),
  pricePerGuess: 0,
  setPricePerGuess: (pricePerGuess: number) => set({ pricePerGuess }),
  punkId: "",
  setPunkId: (punkId: string) => set({ punkId }),
}));
