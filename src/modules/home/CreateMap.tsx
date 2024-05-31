import { ProtectedDataInCollection } from '@iexec/dataprotector';
import { useLoginLogout } from '@/components/NavBar/useLoginLogout.ts';
import { PunkSelector } from '@/modules/home/latestContent/PunkSelector.tsx';
import { OneContentCard } from '@/modules/home/latestContent/OneContentCard.tsx';
import { useUserStore } from '@/stores/user.store.ts';
import { useCreateMapStore } from '@/stores/create.store.ts';
import { AllCreators } from './allCreators/AllCreators.tsx';
import { RewardStrategy } from './latestContent/RewardStrategy.tsx';
import { PreviewCreateMap } from './latestContent/PreviewCreateMap.tsx';
import { rankTransports } from 'node_modules/viem/_types/clients/transports/fallback';

export function CreateMap() {
  const isConnected = useUserStore((state) => state.isConnected);
  const { punkId, rarity, pricePerGuess, durationInDays, poolPrize } = useCreateMapStore();

  const { login } = useLoginLogout();

  return (
    <div className="mb-28 mt-16 w-full">
      {!isConnected && (
        <div className="relative">
          <div className="flex gap-x-4 overflow-x-hidden blur">
            <OneContentCard
              protectedData={
                {
                  id: '0x1234567890',
                  name: 'Content 1',
                } as ProtectedDataInCollection
              }
              className="w-[300px] shrink-0 md:w-[400px]"
            />
            <OneContentCard
              protectedData={
                {
                  id: '0x5678901234',
                  name: 'Interesting video by Melua3',
                } as ProtectedDataInCollection
              }
              className="w-[300px] shrink-0 md:w-[400px]"
            />
            <OneContentCard
              protectedData={
                {
                  id: '0x7890123456',
                  name: 'Exclusive wallpaper',
                } as ProtectedDataInCollection
              }
              className="w-[300px] shrink-0 md:w-[400px]"
            />
          </div>
          <div className="absolute left-1/2 top-14 -translate-x-1/2">
            <button
              type="button"
              onClick={() => {
                login();
              }}
            >
              <div className="rounded-lg border border-white bg-black px-4 py-5 md:px-24">
                <span className="underline">Connect your wallet</span> to see
                all content.
              </div>
            </button>
          </div>
        </div>
      )}

      {isConnected && (
        <>
          <div className="mt-10 sm:mt-20">
            <div className="text-[#D9D9D9]">&nbsp;</div>
            <h1 className="mt-1 text-balance font-anybody text-2xl font-[750] sm:text-5xl">
              Create Your Treasure Hunt
              <br />
            </h1>

            <div className="xl:mt16 mt-8">
              <PunkSelector />
            </div>
            {punkId && (<div className="xl:mt16 mt-8">
              <RewardStrategy />
            </div>)}
            {punkId && rarity>0 && poolPrize>0 && pricePerGuess>0 && (<div className="xl:mt16 mt-8">
              <PreviewCreateMap />
            </div>)}

          </div>
        </>
      )}
    </div>
  );
}
