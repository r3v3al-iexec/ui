import { ProtectedDataInCollection } from '@iexec/dataprotector';
import { Link } from '@tanstack/react-router';
import { clsx } from 'clsx';
import { Lock } from 'react-feather';
import { getCardVisualNumber } from '@/utils/getCardVisualNumber.ts';
import { nrlcToRlc } from '@/utils/nrlcToRlc.ts';
import { readableSecondsToDays } from '@/utils/secondsToDays.ts';
import { cn } from '@/utils/style.utils.ts';
import { truncateAddress } from '@/utils/truncateAddress.ts';
import styles from './OneContentCard.module.css';
import pkSmall1 from '@/assets/punks/punk-small-1.png';
import pkSmall2 from '@/assets/punks/punk-small-2.png';
import pkMedium1 from '@/assets/punks/punk-medium-1.png';
import pkMedium2 from '@/assets/punks/punk-medium-2.png';
import pkLarge1 from '@/assets/punks/punk-large-1.png';
import pkLarge2 from '@/assets/punks/punk-large-2.png';
import { useCreateMapStore } from '@/stores/create.store';

export function OnePunkCard({
  myPunkId,
  linkToDetails,
  className,
  showLockIcon = true,
  onSelected,
  showPick = true
}: {
  myPunkId?: string;
  linkToDetails?: string;
  className?: string;
  showLockIcon?: boolean;
  onSelected: Function
  showPick?: boolean
}) {
  const cardVisualBg = getCardVisualNumber({
    address: "foo",
  });


  const { punkId, setPunkId } = useCreateMapStore();

  const highlightedCls = () => {
    console.log(punkId, myPunkId)

    return showPick && (punkId ==  myPunkId) ? "punkHighLight" : "";
  }

  const selectCard = () => {
    console.log(punkId)
    setPunkId(myPunkId || '')
  }


  return (
    <div className={cn(className, 'flex grow flex-col')} onClick={selectCard}>
      <div
        className={cn(highlightedCls(),
          'group relative mx-auto flex aspect-[2/1] w-full flex-none items-center justify-center overflow-hidden rounded-t-3xl transition-shadow hover:shadow-lg',
          !linkToDetails && 'cursor-default'
        )}
      >
        <div
          className={clsx(
            styles[cardVisualBg],
            'flex h-full w-full items-center justify-center bg-cover bg-bottom'
          )}
        >
          {myPunkId == 'sm1' && (<img src={pkSmall1} className='punkCardImg' />)}
          {myPunkId == 'sm2' && (<img src={pkSmall2} className='punkCardImg' />)}
          {myPunkId == 'md1' && (<img src={pkMedium1} className='punkCardImg' />)}
          {myPunkId == 'md2' && (<img src={pkMedium2} className='punkCardImg' />)}
          {myPunkId == 'lg1' && (<img src={pkLarge1} className='punkCardImg' />)}
          {myPunkId == 'lg2' && (<img src={pkLarge2} className='punkCardImg' />)}

          {showLockIcon && (
            <Lock
              size="30"
              className="absolute text-grey-50 opacity-100 duration-200 group-hover:opacity-50"
            />
          )}
        </div>
      </div>
      <div className="max-w-full grow truncate rounded-b-3xl border-x border-b border-grey-700 bg-grey-900 px-4 py-4 text-sm">
        <div className="flex">
          <div className="flex-1 overflow-hidden">
            <div className="truncate text-grey-50">
              {myPunkId == 'sm1' && (<>PrivacyPirate</>)}
              {myPunkId == 'sm2' && (<>Daemoncrypt</>)}
              {myPunkId == 'md1' && (<>ConfidentialCleopatra</>)}
              {myPunkId == 'md2' && (<>NoNAME_MED</>)}
              {myPunkId == 'lg1' && (<>SconifiedShrek</>)}
              {myPunkId == 'lg2' && (<>NoNAME_LG</>)}
            </div>
            <div className="group mt-0.5 inline-block w-full truncate text-grey-500">
              <span className="inline group-hover:hidden">
                Put the detals here
              </span>
              <span className="hidden text-xs group-hover:inline">
                Put more info here
              </span>
            </div>
          </div>

          <div className="-mt-0.5 pl-6 text-base font-bold text-primary">
            <div className="right-text">
              <div>
                {punkId == 'sm1' && (<>Easy</>)}
                {myPunkId == 'sm2' && (<>Easy</>)}
                {myPunkId == 'sm1' && (<>Easy</>)}
                {myPunkId == 'md1' && (<>Medium</>)}
                {myPunkId == 'md2' && (<>Medium</>)}
                {myPunkId == 'lg1' && (<>Hard</>)}
                {myPunkId == 'lg2' && (<>Hard</>)}
              </div>
              <div className="text-xs right-text">
                {myPunkId == 'sm1' && (<>Staking: 1 RLC</>)}
                {myPunkId == 'sm2' && (<>Staking: 1 RLC</>)}
                {myPunkId == 'md1' && (<>Staking: 10 RLC</>)}
                {myPunkId == 'md2' && (<>Staking: 10 RLC</>)}
                {myPunkId == 'lg1' && (<>Staking: 100 RLC</>)}
                {myPunkId == 'lg2' && (<>Staking: 100 RLC</>)}
              </div>
            </div>
          </div>


        </div>
        {showPick && (<div className="flex justify-end gap-x-2">
          <div className="mt-1 inline-flex h-[25px] items-center rounded-30 border border-grey-50 px-2.5 text-[10px] text-xs">
            Pick
          </div>
        </div>)}

      </div>
    </div>
  );
}
