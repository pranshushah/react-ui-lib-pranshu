import React from 'react';
import {
  FONTCOLOR,
  BGCOLOR,
  HOVERBGCOLOR,
  ACTIVEBGCOLOR,
} from '../../data/Button/color';
import { SIZE } from '../../data/Button/size';
import styled, { keyframes } from 'styled-components';

/**
 * @typedef{ import('react').HTMLProps<HTMLButtonElement>} buttonProps */

/**
 * @typedef {object} customColorsObj
 *  @property {string} FONTCOLOR
 *  @property {string} BGCOLOR
 *  @property {string} HOVERCOLOR
 *  @property {string} ACTIVECOLOR
 */

const getColors = p => {
  if (p.primary) {
    return {
      FONTCOLOR: FONTCOLOR.PRIMARY,
      BGCOLOR: BGCOLOR.PRIMARY,
      HOVERCOLOR: HOVERBGCOLOR.PRIMARY,
      ACTIVECOLOR: ACTIVEBGCOLOR.PRIMARY,
    };
  } else if (p.secondary) {
    return {
      FONTCOLOR: FONTCOLOR.SECONDARY,
      BGCOLOR: BGCOLOR.SECONDARY,
      HOVERCOLOR: HOVERBGCOLOR.SECONDARY,
      ACTIVECOLOR: ACTIVEBGCOLOR.SECONDARY,
    };
  } else if (p.positive) {
    return {
      FONTCOLOR: FONTCOLOR.POSITIVE,
      BGCOLOR: BGCOLOR.POSITIVE,
      HOVERCOLOR: HOVERBGCOLOR.POSITIVE,
      ACTIVECOLOR: ACTIVEBGCOLOR.POSITIVE,
    };
  } else if (p.negative) {
    return {
      FONTCOLOR: FONTCOLOR.NEGATIVE,
      BGCOLOR: BGCOLOR.NEGATIVE,
      HOVERCOLOR: HOVERBGCOLOR.NEGATIVE,
      ACTIVECOLOR: ACTIVEBGCOLOR.NEGATIVE,
    };
  } else if (!p.color) {
    return {
      FONTCOLOR: FONTCOLOR.DEFAULT,
      BGCOLOR: BGCOLOR.DEFAULT,
      HOVERCOLOR: HOVERBGCOLOR.DEFAULT,
      ACTIVECOLOR: ACTIVEBGCOLOR.DEFAULT,
    };
  } else {
    for (let key of Object.keys(BGCOLOR)) {
      if (key === p.color) {
        return {
          FONTCOLOR: FONTCOLOR[key],
          BGCOLOR: BGCOLOR[key],
          HOVERCOLOR: HOVERBGCOLOR[key],
          ACTIVECOLOR: ACTIVEBGCOLOR[key],
        };
      }
    }
    return {
      FONTCOLOR: FONTCOLOR.DEFAULT,
      BGCOLOR: BGCOLOR.DEFAULT,
      HOVERCOLOR: HOVERBGCOLOR.DEFAULT,
      ACTIVECOLOR: ACTIVEBGCOLOR.DEFAULT,
    };
  }
};

function getSize(p) {
  if (p.size) {
    for (let [key, value] of Object.entries(SIZE)) {
      if (key === p.size) {
        return value;
      }
    }
    return SIZE.DEFAULT;
  } else {
    return SIZE.DEFAULT;
  }
}

const NormalButton = styled.button.attrs(props => {
  const colors = props.customColors ? props.customColors : getColors(props);
  return {
    ...colors,
    fontSize: getSize(props),
  };
})`
  background: ${props => props.BGCOLOR};
  color: ${props => props.FONTCOLOR};
  display: inline-block;
  min-height: 1em;
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${props => props.fontSize};
  font-weight: 700;
  margin: 0 0.3em 0 0.3em;
  line-height: 1em;
  padding: 0.78em 1.5em;
  border: none;
  outline: none;
  border-radius: 0.1rem;
  transition-duration: 0.3s;
  pointer-events: ${props => {
    if (props.disabled) {
      return 'none';
    }
  }};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.45' : '1')};
  &:hover {
    background: ${props => props.HOVERCOLOR};
  }
  &:active {
    background: ${props => props.ACTIVECOLOR};
  }
`;

const BasicButton = styled(NormalButton)`
  background: transparent;
  font-weight: 400;
  color: ${props => props.BGCOLOR};
  box-shadow: 0 0 0 1px ${props => props.BGCOLOR} inset;
  &:hover {
    background: none;
  }
  &:active {
    color: ${props => props.ACTIVECOLOR};
    box-shadow: 0 0 0 1px ${props => props.ACTIVECOLOR} inset;
  }
`;

const InvertedButton = styled(NormalButton)`
  background: transparent;
  color: ${props => props.BGCOLOR};
  box-shadow: 0 0 0 2px ${props => props.BGCOLOR} inset;
  &:hover {
    background: ${props => props.BGCOLOR};
    color: ${props => props.FONTCOLOR};
  }
  &:active {
    background: ${props => props.ACTIVECOLOR};
  }
`;

const spinner = keyframes`
  to {
    transform: rotate(360deg);
    }
`;

const LoadingDiv = styled.div`
  box-sizing: border-box;
  border-radius: 50%;
  border: 3px solid lightgray;
  border-top-color: darkgray;
  height: ${props => props.size};
  width: ${props => props.size};
  animation: ${spinner} 0.7s linear infinite;
`;

const LoadingNormalButton = props => (
  <NormalButton {...props}>
    <LoadingDiv size={getSize(props)} />
  </NormalButton>
);

const LoadingInvertedButton = props => (
  <InvertedButton {...props}>
    <LoadingDiv size={getSize(props)} />
  </InvertedButton>
);

const LoadingBasicButton = props => (
  <BasicButton {...props}>
    <LoadingDiv size={getSize(props)} />
  </BasicButton>
);

/**
 * @param {{
 * color:("red"|"black"|"grey"|"brown"|"pink"|"teal"|"orange"|"yellow"|"blue"),
 * size:("xs"|"s"|"m"|"l"|"xl"),
 * primary:boolean,
 * secondary:boolean,
 * basic:boolean,
 * inverted:boolean,
 * loading:boolean,
 * positive:boolean,
 * negative:boolean,
 * customColors:customColorsObj
 * } & buttonProps} props
 */

function Button(props, ref) {
  console.log('button');
  if (props.basic) {
    return props.loading ? (
      <LoadingBasicButton ref={ref} {...props} />
    ) : (
      <BasicButton ref={ref} {...props} />
    );
  } else if (props.inverted) {
    return props.loading ? (
      <LoadingInvertedButton ref={ref} {...props} />
    ) : (
      <InvertedButton {...props} ref={ref} />
    );
  } else {
    return props.loading ? (
      <LoadingNormalButton ref={ref} {...props} />
    ) : (
      <NormalButton {...props} ref={ref} />
    );
  }
}

export default React.memo(React.forwardRef(Button));
