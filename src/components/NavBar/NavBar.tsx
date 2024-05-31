import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { LogOut } from 'react-feather';
import useLocalStorageState from 'use-local-storage-state';
import { useDevModeStore } from '@/stores/devMode.store.ts';
import { useUserStore } from '@/stores/user.store.ts';
import { LOCAL_STORAGE_PREFIX } from '@/utils/localStorage.ts';
import { cn } from '@/utils/style.utils.ts';
import iExecLogo from '../../assets/logo.png';
import { AddressChip } from '../NavBar/AddressChip.tsx';
import { Button } from '../ui/button.tsx';
import { Label } from '../ui/label.tsx';
import { Switch } from '../ui/switch.tsx';
import { useLoginLogout } from './useLoginLogout.ts';
import { ArrowUpRight, CheckCircle, DownloadCloud, Key } from 'react-feather';

export function NavBar({ className }: { className?: string }) {
  const { isConnected, address } = useUserStore();
  const { login, logout } = useLoginLogout();
  const [isStorageDevMode, setStorageDevMode] = useLocalStorageState(
    `${LOCAL_STORAGE_PREFIX}_devMode`,
    { defaultValue: false }
  );
  const { isDevMode, setDevMode } = useDevModeStore();

  // Load value from localStorage
  useEffect(() => {
    setDevMode(isStorageDevMode);
  }, []);

  // Update localStorage value on change
  useEffect(() => {
    setStorageDevMode(isDevMode);
  }, [isDevMode]);

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-[64px] items-center justify-between bg-grey-900 px-2 text-white drop-shadow-[0_0_10px_rgb(0,0,0)] sm:px-8',
        className
      )}
    >
      <div className="py-2">
        <div className="-mx-2 flex h-full items-center p-2">
          <Link to={'/'} className="shrink-0 ">
            <img src={iExecLogo} width="200" alt="iExec logo" />
          </Link>

          <div className="ml-3 reveal-text">    

          </div>
        </div>
        
      </div>

      {isConnected ? (
        <div className="mb-16 hidden flex-1 flex-col justify-center gap-y-4 pl-4 group-has-[:checked]:flex md:mb-0 md:flex md:translate-y-0 md:flex-row md:items-center md:justify-end lg:ml-4">
          <div className="flex flex-col gap-y-4 md:mx-2 md:flex-row md:items-start md:gap-x-2 md:text-base lg:ml-6 lg:mr-8 lg:gap-x-5 xl:mr-20 xl:gap-x-16">
            <Link to={'/explore'} className="p-1 hover:drop-shadow-link-hover reveal-text-nav">
              Leaderboard
            </Link>
            <Link
              to={'/my-content'}
              className="p-1 hover:drop-shadow-link-hover"
            >
              Manage
            </Link>
          </div>

          <div className="-order-1 mb-4 flex md:-order-none md:mb-0">
            <AddressChip className="md:hidden lg:flex" address={address!} />
            <button
              type="button"
              className="-mr-2 ml-2 p-1 hover:drop-shadow-link-hover"
              onClick={() => logout()}
            >
              <LogOut size="25" />
            </button>
          </div>
          <div className="mx-4 hidden h-[36px] w-px bg-grey-700 md:block"></div>
        
        </div>
      ) : (
        <div className="items-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              login();
            }}
          >
            Connect wallet
          </Button>
        </div>
      )}
    </header>
  );
}
