import { component$ } from '@builder.io/qwik';

export const Image = component$(
  (props: {
    imgSrc: string;
    imgAlt: string;
    inlineStyle?: string;
    imgLoading?: 'eager';
  }) => {
    return (
      <img
        src={props.imgSrc}
        alt={props.imgAlt}
        loading={props.imgLoading === 'eager' ? undefined : 'lazy'}
        decoding={props.imgLoading === 'eager' ? undefined : 'async'}
        style={props.inlineStyle}
      />
    );
  }
);
