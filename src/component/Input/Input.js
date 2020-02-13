import React from 'react';
import styled from 'styled-components';
import { INPUTCOLOR } from '../../data/Input/inputColor';
import { FONTSIZE, WIDTHSIZE } from '../../data/Input/inputSize';

/**
 * @typedef{ import('react').HTMLProps<HTMLInputElement>} inputProps
 * @typedef{import('react').Ref<HTMLInputElement>}  inputRefType
 * @typedef{import('react').Ref<HTMLLabelElement>} labelRefType
 */

/**
 * @typedef {object} refsObj
 * @property {labelRefType} labelRef
 * @property {inputRefType} inputRef
 */

const getColor = p => {
  console.log();
  if (p.error) {
    return INPUTCOLOR.NEGATIVE;
  } else if (!p.color) {
    return INPUTCOLOR.DEFAULT;
  } else {
    for (let key of Object.keys(INPUTCOLOR)) {
      if (key === p.color) {
        return INPUTCOLOR[key];
      }
    }
    return INPUTCOLOR.DEFAULT;
  }
};

const getFColor = p => {
  if (p.error) {
    return INPUTCOLOR.NEGATIVE;
  }
  if (!p.focusColor) {
    return INPUTCOLOR.teal;
  } else {
    for (let key of Object.keys(INPUTCOLOR)) {
      if (key === p.focusColor) {
        return INPUTCOLOR[key];
      }
    }
    return INPUTCOLOR.teal;
  }
};

function getFontSize(p) {
  if (p.size) {
    for (let [key, value] of Object.entries(FONTSIZE)) {
      if (key === p.size) {
        return value;
      }
    }
    return FONTSIZE.DEFAULT;
  } else {
    return FONTSIZE.DEFAULT;
  }
}

function getWidthSize(p) {
  if (p.size) {
    for (let [key, value] of Object.entries(WIDTHSIZE)) {
      if (key === p.size) {
        return value;
      }
    }
    return WIDTHSIZE.DEFAULT;
  } else {
    return WIDTHSIZE.DEFAULT;
  }
}

const InputContainer = styled.div`
  width: ${props => props.widthSize};
  height: 50px;
  position: relative;
`;

const InputField = styled.input`
  width: 100%;
  height: 100%;
  font-size: ${props => props.fontSize};
  padding-top: 12px;
  border: none;
  outline: none;
  ::placeholder {
    color: transparent;
    display: none;
  }
  &:disabled {
    background: none;
    pointer-events: none;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  border-bottom: ${props =>
    `1px ${props.disabled ? 'dotted' : 'solid'} ${
      props.disabled ? INPUTCOLOR.grey : props.normalColor
    }`};
  color: ${props => (props.disabled ? INPUTCOLOR.grey : props.normalColor)};
  ${InputField}:focus + & {
    color: ${props => props.focusColor};
    border-bottom: ${props => `2px solid ${props.focusColor}`};
  }
`;

const InputLabelContent = styled.span`
  position: absolute;
  left: 0;
  bottom: 4px;
  font-size: ${props => props.FontSize};
  transition: all 0.3s ease;
  ${InputField}:focus + ${InputLabel} &,
  ${InputField}:not(:placeholder-shown) + ${InputLabel} & {
    transform: translateY(-100%);
    font-size: 15px;
    padding-bottom: 4px;
  }
`;

/**
 *
 * @param {{
 * color:("red"|"black"|"grey"|"brown"|"pink"|"teal"|"orange"|"yellow"|"blue"),
 * focusColor:("red"|"black"|"grey"|"brown"|"pink"|"teal"|"orange"|"yellow"|"blue"),
 * size:("tiny"|"small"|"medium"|"large"|"huge"),
 * customColor:string,
 * customFocusColor:string,
 * customFontSize:string,
 * customWidthSize:string,
 * error:boolean,
 * name:number
 * } & inputProps} props
 * @param {refsObj} ref
 */

function Input(props, ref) {
  console.log('input');
  if (ref) {
    var { labelRef, inputRef } = ref; // because it will be function scoped not blocked scope
  }
  const normalColor = props.customColor ? props.customColor : getColor(props);
  const focusColor = props.customFocusColor
    ? props.customFocusColor
    : getFColor(props);
  const fontSize = props.customFontSize
    ? props.customFontSize
    : getFontSize(props);
  const widthSize = props.customWidthSize
    ? props.customWidthSize
    : getWidthSize(props);
  return (
    <InputContainer widthSize={widthSize}>
      <InputField
        fontSize={fontSize}
        normalColor={normalColor}
        ref={inputRef ? inputRef : null}
        type='text'
        {...props}
        placeholder='x'
      />
      <InputLabel
        focusColor={focusColor}
        ref={labelRef}
        disabled={props.disabled}
        normalColor={normalColor}>
        <InputLabelContent focusColor={focusColor} FontSize={fontSize}>
          {props.label}
        </InputLabelContent>
      </InputLabel>
    </InputContainer>
  );
}

export default React.memo(React.forwardRef(Input));
