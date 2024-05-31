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
import { generateProtectedData } from '@/utils/generateProtectedData';

export function PreviewCreateMap({
}: {}) {
  const latestContentRef = useRef<HTMLDivElement>(null);
  const loggedUserAddress = useUserStore().address;
  const { punkId, rarity, pricePerGuess, durationInDays, poolPrize } = useCreateMapStore();

  var isLoading = false;
  var isError = false;
  var error = "";

  const clickIt = (foo) => {
    console.log(foo)
  }

  const processIt = () => {

    var mapSize = 0;
    mapSize = punkId == 'sm1' ? 1000 * 1000 : mapSize;
    mapSize = punkId == 'sm2' ? 1000 * 1000 : mapSize;
    mapSize = punkId == 'md1' ? 10000 * 10000 : mapSize;
    mapSize = punkId == 'md2' ? 10000 * 10000 : mapSize;
    mapSize = punkId == 'lg1' ? 100000 * 100000 : mapSize;
    mapSize = punkId == 'lg2' ? 100000 * 100000 : mapSize;

    var rewardRatio = (100.00 - rarity) / 100.00
    var protectedDataList = generateProtectedData(mapSize, rewardRatio, poolPrize);
    console.log("protectedDataList", protectedDataList)
  }

  const formatThousands = (num) => {
    const formatter = new Intl.NumberFormat('en-US');
    return formatter.format(num);

  }
  const getPlayerCount = () => {
    var areaLength = 0;

    areaLength = punkId == 'sm1' ? 1000 : areaLength;
    areaLength = punkId == 'sm2' ? 1000 : areaLength;
    areaLength = punkId == 'md1' ? 10000 : areaLength;
    areaLength = punkId == 'md2' ? 10000 : areaLength;
    areaLength = punkId == 'lg1' ? 100000 : areaLength;
    areaLength = punkId == 'lg2' ? 100000 : areaLength;


    let cols = areaLength / 100;
    let lines = areaLength / 100;
    return cols * lines
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="grow text-2xl font-bold">3️⃣ Preview and Launch the game 🔥</h3>
      </div>

      <div ref={latestContentRef}>

        <div
          className="mt-8 grid w-full gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          }}
        >
          <div
            ref={latestContentRef}
            className="mt-8 inline-flex w-full max-w-full items-stretch gap-x-4 overflow-auto pb-4"
          >
            <div>
              <OnePunkCard
                myPunkId={punkId}
                onSelected={clickIt}
                showLockIcon={false}
                className="h-full"
                showPick={false}
              />
            </div>

          </div>
          <div className="flex w-[500px] flex-col md:w-[600px]">
            <div className="width-300">
              <br />Hey, you are all set!
              <br />With this setup up to <b>{formatThousands(getPlayerCount())} players</b> can join in at <b><>{pricePerGuess}</> RLC per guess</b> &nbsp;😎
              <br />You will be staking {punkId == 'sm1' && (<>1</>)}
              {punkId == 'sm2' && (<>1</>)}
              {punkId == 'md1' && (<>10</>)}
              {punkId == 'md2' && (<>10</>)}
              {punkId == 'lg1' && (<>100</>)}
              {punkId == 'lg2' && (<>100</>)} RLC into the <b>community pool</b>
            </div>
            <div className="mt-[60px]">
              <Button onClick={processIt}>
                Let's go 🚀
              </Button>
            </div>
          </div>

        </div>
        <div className="mt-[60px]">

        </div>


      </div>
    </>
  );
}
