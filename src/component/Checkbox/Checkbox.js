import React from 'react';
import styled from 'styled-components';
import { FONTCOLOR, CHECKEDCOLOR } from '../../data/Checkbox/CheckBoxColor';

/**
 * @typedef {object} checkBoxrefObj
 * @param {React.Ref<HTMLLabelElement>} labelRef
 * @param {React.Ref<HTMLInputElement>} inputRef
 */

function getfontColor(p) {
  if (p.fontColor) {
    for (let key of Object.keys(FONTCOLOR)) {
      if (key === p.fontColor) {
        return FONTCOLOR[key];
      }
    }
    return FONTCOLOR.DEFAULT;
  } else {
    return FONTCOLOR.DEFAULT;
  }
}

function getCheckedColor(p) {
  if (p.chekedColor) {
    for (let key of Object.keys(CHECKEDCOLOR)) {
      if (key === p.chekedColor) {
        return CHECKEDCOLOR[key];
      }
    }
    return CHECKEDCOLOR.DEFAULT;
  } else {
    return CHECKEDCOLOR.DEFAULT;
  }
}

const CheckBoxInput = styled.input`
  display: none;
`;

const CheckBoxLabel = styled.label`
  display: block;
  padding: 0.4em;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  font-size: 16px;
  color: ${props => (props.disabled ? '#838383' : props.fontColor)};
  &::before {
    content: '\\2713';
    border: ${props => ` 1px solid ${props.checkedColor}`};
    border-radius: 2px;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 7px;
    padding-left: 0.1em;
    padding-bottom: 0.2em;
    vertical-align: bottom;
    color: transparent;
    font-size: 16px;
  }
  ${CheckBoxInput}:checked + &:before {
    background: ${props => props.checkedColor};
    border-color: ${props => props.checkedColor};
    color: #fff;
    transition: 0.2s;
  }
  ${CheckBoxInput} + &:active:before {
    transform: scale(0);
  }

  ${CheckBoxInput}:checked:disabled + &:before {
    transform: scale(1);
    border-color: ${props => props.checkedColor};
    background-color: ${props => props.checkedColor};
    pointer-events: none;
    opacity: 0.5;
  }
  ${CheckBoxInput}:disabled + &:before {
    transform: scale(1);
    border-color: #cacbcd;
    background-color: #cacbcd;
    pointer-events: none;
  }
`;

/**
 *
 * @typedef{ import('react').HTMLProps<HTMLInputElement>} inputProps */

/**
 *
 * @param {{
 * fontColor:("red"|"black"|"brown"|"pink"|"teal"|"orange"|"yello"|"blue"),
 * chekedColor:("red"|"black"|"brown"|"pink"|"teal"|"orange"|"yello"|"blue"),
 * customFontColor:string,
 * customCheckedColor:string,
 * label:string,
 * } & inputProps} props
 * @param {checkBoxrefObj} ref
 */

function CheckBox(props, ref) {
  if (ref) {
    var { labelRef, inputRef } = ref;
  }
  const fontColor = props.customFontColor
    ? props.customFontColor
    : getfontColor(props);
  const checkedColor = props.customCheckedColor
    ? props.customCheckedColor
    : getCheckedColor(props);
  const id = props.label + Math.random();
  return (
    <>
      <CheckBoxInput id={id} type='checkbox' {...props} ref={inputRef} />
      <CheckBoxLabel
        fontColor={fontColor}
        ref={labelRef ? labelRef : null}
        checkedColor={checkedColor}
        disabled={props.disabled ? props.disabled : false}
        htmlFor={id}>
        {props.label}
      </CheckBoxLabel>
    </>
  );
}

export default React.memo(React.forwardRef(CheckBox));
