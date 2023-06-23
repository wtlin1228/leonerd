import { component$, useContext } from '@builder.io/qwik';
import { GlobalStore } from '../../context';
import { Image } from './image';
import type { ImageProps } from './image';

export interface ImageOnThemeProps extends ImageProps {
  darkImgSrc: string;
  lightImgSrc: string;
}

export const ImageOnTheme = component$((props: ImageOnThemeProps) => {
  const globalStore = useContext(GlobalStore);

  return (
    <Image
      imgSrc={
        globalStore.theme === 'light' ? props.lightImgSrc : props.darkImgSrc
      }
      imgAlt={props.imgAlt}
      inlineStyle={props.inlineStyle}
      imgLoading={props.imgLoading}
    />
  );
});
