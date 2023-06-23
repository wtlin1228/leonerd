import { component$ } from '@builder.io/qwik';

export interface ImageProps {
  imgSrc: string;
  imgAlt: string;
  inlineStyle?: string;
  imgLoading?: 'eager';
}

export const Image = component$((props: ImageProps) => {
  return (
    <img
      src={props.imgSrc}
      alt={props.imgAlt}
      loading={props.imgLoading === 'eager' ? undefined : 'lazy'}
      decoding={props.imgLoading === 'eager' ? undefined : 'async'}
      style={props.inlineStyle}
    />
  );
});
