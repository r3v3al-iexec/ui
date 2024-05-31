import type { ProtectedDataInCollection } from '@iexec/dataprotector';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Alert } from '@/components/Alert.tsx';
import { CarouselScrollArrows } from '@/components/CarouselScrollArrows.tsx';
import { CircularLoader } from '@/components/CircularLoader.tsx';
import { DocLink } from '@/components/DocLink.tsx';
import { getDataProtectorClient } from '@/externals/dataProtectorClient.ts';
import { useUserStore } from '@/stores/user.store.ts';
import { OnePunkCard } from './OnePunkCard.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useCreateMapStore } from '@/stores/create.store.ts';


export function RewardStrategy({
  isRentable,
}: { isRentable?: true | undefined } | undefined = {}) {
  const latestContentRef = useRef<HTMLDivElement>(null);
  const loggedUserAddress = useUserStore().address;
  
  const { setPunkId, punkId, poolPrize, setPoolPrize, rarity, setRarity, durationInDays, setDurationInDays, pricePerGuess, setPricePerGuess } = useCreateMapStore();
  
  var isLoading = false;
  var isError = false;
  var error = "";

  const onPunSelected = (aPunkId) => {
    setPunkId(aPunkId);
    console.log(selectedPunkId)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="grow text-2xl font-bold">2️⃣ Set the Reward Strategy 💰</h3>
      </div>

      <div ref={latestContentRef} className='pad-Top-20'>
      <form
            noValidate

            className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:flex md:grid-cols-1"
          >
            <div className="col-span-1 flex-1 @container sm:col-span-2 md:grid-cols-1">
              <div className="block @xl:inline-block">
                <label htmlFor="subscription" className="mr-3">
                  Pool Prize
                </label>
                <Input
                  type="number"
                  value={poolPrize}
                  placeholder="Price"
                  appendText="RLC"
                  className="inline-block w-36 border-grey-500"
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPoolPrize(event.target.value)
                  }
                />
              </div>
              <div className="block @xl:inline-block">
                <label htmlFor="subscription" className="mr-3 @xl:ml-4">
                  Rarity
                </label>
                <Input
                  type="number"
                  value={rarity}
                  placeholder="Rarity"
                  appendText="%"
                  className="inline-block w-36 border-grey-500"
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setRarity(event.target.value)
                  }
                />
              </div>
              <div className="block @xl:inline-block">
                <label htmlFor="subscription" className="mr-3 @xl:ml-4">
                  Per Guess
                </label>
                <Input
                  type="number"
                  value={pricePerGuess}
                  placeholder="Price Per Guess"
                  appendText="RLC"
                  className="inline-block w-36 border-grey-500"
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPricePerGuess(event.target.value)
                  }
                />
              </div>
            </div>
            
          </form>
      </div>
    </>
  );
}
