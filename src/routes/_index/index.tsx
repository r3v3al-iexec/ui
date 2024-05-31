import '@fontsource/space-grotesk/700.css';
import { createFileRoute } from '@tanstack/react-router';
import headerMotionUrl from '../../assets/header-motion.mp4';
import { CreateMap } from '../../modules/home/CreateMap.tsx';
import { ContentCreatorSection } from '../../modules/home/ContentCreatorSection.tsx';
import punkLogo from '@/assets/punk-banner.png';


export const Route = createFileRoute('/_index/')({
  component: Home,
});

function Home() {
  return (
    <>
      <div className="relative flex h-[300px] max-w-7xl items-center  lg:h-[330px] xl:h-[360px] banner-bg">
        <img src={punkLogo} className="punk-floating"/>
        <div className="px-10 text-white">
          <div className="scale-y-100 text-balance font-anybody text-2xl font-bold sm:text-5xl sm:leading-[3rem] reveal-text-subTitle">
          Every Pixel is a
            <br />
            Chance to Earn 
          </div>
          <div className="scale-y-100 text-balance font-anybody text-2xl font-bold sm:text-2xl sm:leading-[3rem] reveal-text-subTitle2">
          Search for treasure hidden by the Crypto Pirates to earn RLC and 
            <br />
            other digital assets, or stake to create your own treasure hunts!
          </div>


        </div>
      </div>

      
      <div className="mt-10 sm:mt-20">
        <h1 className="mt-1 text-balance font-anybody text-2xl font-[750] sm:text-5xl">
        </h1>
        <CreateMap />
      </div>

      <ContentCreatorSection className="mt-16 sm:mt-32 xl:mt-36" />
    </>
  );
}
