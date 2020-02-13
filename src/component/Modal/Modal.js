import React from 'react';
import styled from 'styled-components';
import { HOVERBGCOLOR, FONTCOLOR } from '../../data/Button/color';
import Button from '../Button/Button';
import { WIDTHSIZE } from '../../data/Modal/Modal';

/**
 * @typedef {object} modalRefObj
 * @property {React.Ref<HTMLDivElement>} modalContainerRef
 * @property {React.Ref<HTMLHeadingElement>} headerRef
 * @property {React.Ref<HTMLDivElement>} modalContentContainerRef
 * @property {React.Ref<HTMLButtonElement>} cancelRef
 * @property {React.Ref<HTMLButtonElement>} confirmRef
 */

function getColors(p) {
  if (!p.theme) {
    return [FONTCOLOR.DEFAULT, HOVERBGCOLOR.DEFAULT];
  } else {
    for (let key of Object.keys(HOVERBGCOLOR)) {
      if (key === p.theme) {
        return [FONTCOLOR[key], HOVERBGCOLOR[key]];
      }
    }
    return [FONTCOLOR.DEFAULT, HOVERBGCOLOR.DEFAULT];
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

/**
 *@param {string} width
 *@returns {string} left position
 */
function getLeftPosition(width) {
  const arr = width.split('%');
  return `${(100 - Number(arr[0])) / 2}%`;
}

const BackDropDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 116;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const BackDrop = ({ clicked, show }) => {
  return show ? <BackDropDiv onClick={clicked} /> : null;
};

const ModalContainer = styled.div`
  position: fixed;
  z-index: 513;
  background-color: white;
  width: ${props => props.widthSize};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
  left: ${props => getLeftPosition(props.widthSize)};
  top: ${props => (props.topAligned ? '10%' : '30%')};
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  font-family: Arial, Helvetica, sans-serif;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-100vh)')};
  opacity: ${props => (props.show ? 1 : 0)};
`;

const ModalHeaderContainer = styled.header`
  padding: 1rem;
  background: ${props => props.BGCOLOR};
  color: ${props => props.FONTCOLOR};
`;

const ModalHeader = styled.h1`
  margin: 0;
  font-size: 1.25rem;
`;

const ModalContentContainer = styled.section`
  padding: 1rem;
`;

const ModalAction = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 0.7rem;
`;

/**
 * @param {{
 * theme:("red"|"black"|"brown"|"pink"|"teal"|"orange"|"yellow"|"blue"),
 * size:("tiny"|"small"|"medium"|"large"|"huge"),
 * title:string,
 * show:boolean,
 * modalClosed:Function,
 * modalConfirmed:Function,
 * topAligned:boolean,
 * canCancel:boolean,
 * canConfirm:boolean,
 * }} props
 * @param {modalRefObj} ref
 */

const Modal = (props, ref) => {
  if (ref) {
    var {
      modalContainerRef,
      headerRef,
      modalContentContainerRef,
      cancelRef,
      confirmRef,
    } = ref;
  }
  const [FONTCOLOR, BGCOLOR] = getColors(props);
  const widthSize = getWidthSize(props);

  const Heading = props.title ? (
    <ModalHeaderContainer BGCOLOR={BGCOLOR} FONTCOLOR={FONTCOLOR}>
      <ModalHeader ref={headerRef}>{props.title}</ModalHeader>
    </ModalHeaderContainer>
  ) : null;
  const ModalThings = props.show ? (
    <ModalContainer
      ref={modalContainerRef}
      widthSize={widthSize}
      show={props.show}
      topAligned={props.topAligned}>
      {Heading}
      <ModalContentContainer ref={modalContentContainerRef}>
        {props.children}
      </ModalContentContainer>
      <ModalAction>
        {props.canCancel && (
          <Button
            color={props.theme ? props.theme : null}
            basic
            ref={cancelRef}
            onClick={props.modalClosed ? props.modalClosed : null}>
            Cancel
          </Button>
        )}
        {props.canConfirm && (
          <Button
            ref={confirmRef}
            color={props.theme ? props.theme : null}
            onClick={props.modalConfirmed ? props.modalConfirmed : null}>
            Confirm
          </Button>
        )}
      </ModalAction>
    </ModalContainer>
  ) : null;
  return (
    <>
      <BackDrop show={props.show} clicked={props.modalClosed} />
      {ModalThings}
    </>
  );
};

export default React.memo(React.forwardRef(Modal));
