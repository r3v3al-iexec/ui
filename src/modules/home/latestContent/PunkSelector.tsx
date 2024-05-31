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
import { useCreateMapStore } from '@/stores/create.store.ts';




export function PunkSelector({
  isRentable,
}: { isRentable?: true | undefined } | undefined = {}) {
  const latestContentRef = useRef<HTMLDivElement>(null);
  const loggedUserAddress = useUserStore().address;
  const { setPunkId, punkId } = useCreateMapStore();
  

  var isLoading = false;
  var isError = false;
  var error = "";
  var data = ['sm1', 'sm2', 'md1', 'lg1'];

  const onPunSelected = (aPunkId) => {
    setPunkId(aPunkId);
    console.log(punkId)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="grow text-2xl font-bold">1️⃣ Pick your Punk 👀</h3>
        {!!data?.length && data?.length > 0 && (
          <CarouselScrollArrows
            className="flex-none"
            carousel={latestContentRef}
          />
        )}
      </div>

      {isLoading && (
        <div className="mt-6 flex flex-col items-center gap-y-4">
          <CircularLoader />
        </div>
      )}

      {isError && (
        <Alert variant="error" className="mt-4">
          <p>Oops, something went wrong while fetching content of the week.</p>
          <p className="mt-1 text-sm">{error.toString()}</p>
        </Alert>
      )}

      {data?.length === 0 && (
        <div className="mt-4 flex flex-col items-center gap-y-4">
          No new content? 🤔
        </div>
      )}

      <div
        ref={latestContentRef}
        className="mt-8 inline-flex w-full max-w-full items-stretch gap-x-4 overflow-auto pb-4"
      >
        {!!data?.length &&
          data?.length > 0 &&
          data?.map((dpunkId) => (
            <div
              key={dpunkId}
              className="flex w-[300px] shrink-0 flex-col md:w-[400px]"
            >
              <OnePunkCard
                myPunkId={dpunkId}
                showLockIcon={false}
                linkToDetails="/content/$protectedDataAddress"
                onSelected={onPunSelected}
              />
            </div>
          ))}
      </div>

      <DocLink className="mb-14 mt-6">
        dataprotector-sdk / Method called:{' '}
        <a
          href="https://documentation-tools.vercel.app/tools/dataProtector/dataProtectorSharing/misc/getProtectedDataInCollections.html"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          <br />
          {isRentable
            ? 'getProtectedDataInCollections({ isRentable: true })'
            : 'getProtectedDataInCollections()'}
        </a>
      </DocLink>
    </>
  );
}
