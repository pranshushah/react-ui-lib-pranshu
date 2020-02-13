import React from 'react';
import styled from 'styled-components';
import { BGCOLOR, COLOR } from '../../data/Message/MessageColor';
import { FONTSIZE, HEADERFONTSIZE } from '../../data/Message/MessageSize';

/**
 * @typedef {object} messageRefObj
 * @property {React.Ref<HTMLSpanElement>} closeButtonRef
 * @property {React.Ref<HTMLDivElement>} headerRef
 * @property {React.Ref<HTMLDivElement>} containerRef
 * @property  {React.Ref<HTMLParagraphElement>} contentContainerRef
 */

function getColors(p) {
  if (p.positive) {
    return [BGCOLOR.POSITIVE, COLOR.POSITIVE];
  } else if (p.negative) {
    return [BGCOLOR.NEGATIVE, COLOR.NEGATIVE];
  } else if (p.info) {
    return [BGCOLOR.INFO, COLOR.INFO];
  } else if (p.warning) {
    return [BGCOLOR.WARNING, COLOR.WARNING];
  } else if (!p.color) {
    return [BGCOLOR.DEFAULT, COLOR.DEFAULT];
  } else {
    for (let key of Object.keys(BGCOLOR)) {
      if (key === p.color) {
        return [BGCOLOR[key], COLOR[key]];
      }
    }
    return [BGCOLOR.DEFAULT, COLOR.DEFAULT];
  }
}

function getSize(p) {
  if (p.size) {
    for (let key of Object.keys(FONTSIZE)) {
      if (key === p.size) {
        return [FONTSIZE[key], HEADERFONTSIZE[key]];
      }
    }
    return [FONTSIZE.DEFAULT, HEADERFONTSIZE.DEFAULT];
  } else {
    return [FONTSIZE.DEFAULT, HEADERFONTSIZE.DEFAULT];
  }
}

const MessageContainer = styled.div`
  font-size: ${props => props.fontSize};
  position: relative;
  margin: 1em 0;
  padding: 1em 1.5em;
  line-height: 1.42em;
  border-radius: 0.14rem;
  font-family: inherit;
  transition: 0, 4s;
  background: ${props => props.bgColor};
  color: ${props => props.fontColor};
  box-shadow: ${props =>
    `0 0 0 1px ${props.fontColor} inset, 0 0 0 0 transparent`};
  &:last-child {
    margin-bottom: 0px;
  }
  &:first-child {
    margin-top: 0px;
  }
`;

const MessageHeader = styled.div`
  font-size: ${props => props.headerFontSize};
  margin-top: 0px;
  display: block;
  font-weight: 700;
  font-family: inherit;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
`;

const MessageContent = styled.p`
  opacity: 0.85;
  margin: 0px;
  ${MessageHeader}+ & {
    margin-top: 0.25em;
  }
`;

const MessageCloseButton = styled.span`
  margin-left: 15px;
  line-height: 20px;
  font-weight: bold;
  float: right;
  line-height: 20px;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.5;
  color: ${props => props.fontColor};
  transition: opacity 0.4s;
  &:hover {
    opacity: 1;
  }
`;

/**
 *
 * @param {{
 * color:("red"|"black"|"brown"|"pink"|"teal"|"orange"|"yellow"|"blue"),
 * size:("tiny"|"small"|"medium"|"large"|"huge"),
 * header:string,
 * positive:boolean,
 * negative:boolean,
 * info:boolean,
 * warning:boolean,
 * show:boolean,
 * customFontColor:string,
 * customBgcolor:string,
 * customFontSize:string,
 * customHeaderFontSize:string,
 * onClose:function
 * }} props
 * @param {messageRefObj} ref
 */

function Message(props, ref) {
  if (ref) {
    var { headerRef, closeButtonRef, containerRef, contentContainerRef } = ref;
  }
  let bgColor, fontColor, fontSize, headerFontSize;
  // for colors
  if (props.customBgcolor && props.customFontColor) {
    bgColor = props.customBgcolor;
    fontColor = props.customFontColor;
  } else if (props.customFontColor) {
    fontColor = props.customFontColor;
    [bgColor] = getColors(props);
  } else if (props.customBgcolor) {
    bgColor = props.customBgcolor;
    [, fontColor] = getColors(props);
  } else {
    [bgColor, fontColor] = getColors(props);
  }
  // for font-size
  if (props.customFontSize && props.customHeaderFontSize) {
    fontSize = props.customFontSize;
    headerFontSize = props.customHeaderFontSize;
  } else if (props.customFontSize) {
    fontSize = props.customFontSize;
    [, headerFontSize] = getSize(props);
  } else if (props.customHeaderFontSize) {
    headerFontSize = props.customHeaderFontSize;
    [fontSize] = getSize(props);
  } else {
    [fontSize, headerFontSize] = getSize(props);
  }

  const header = props.header ? (
    <MessageHeader
      ref={headerRef ? closeButtonRef : null}
      headerFontSize={headerFontSize}>
      {props.header}
      <MessageCloseButton
        ref={closeButtonRef ? closeButtonRef : null}
        fontColor={fontColor}
        onClick={props.onClose ? props.onClose : null}>
        &times;
      </MessageCloseButton>
    </MessageHeader>
  ) : null;
  const message = props.show ? (
    <MessageContainer
      ref={containerRef ? containerRef : null}
      bgColor={bgColor}
      fontColor={fontColor}
      fontSize={fontSize}>
      {header}
      <MessageContent
        ref={contentContainerRef ? contentContainerRef : null}
        fontSize={fontSize}>
        {props.children}
        {props.header ? null : (
          <MessageCloseButton
            ref={closeButtonRef ? closeButtonRef : null}
            fontColor={fontColor}
            onClick={props.onClose ? props.onClose : null}>
            &times;
          </MessageCloseButton>
        )}
      </MessageContent>
    </MessageContainer>
  ) : null;
  return message;
}

export default React.memo(React.forwardRef(Message));
