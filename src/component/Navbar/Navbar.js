import React, { useState, ReactChildren } from 'react';
import styled from 'styled-components';

/**
 * @typedef{ import('react').HTMLProps<HTMLAnchorElement>} anchorProps
 */

/**
 * @typedef {object} customColorType
 * @property {string} fontColor
 * @property {string} bgColor
 * @property {string} hoverBgColor
 */

/**
 * @param {string} col
 * @param {number} amt
 */

const NavLogo = styled.div`
  letter-spacing: 5px;
  text-transform: uppercase;
  font-size: 20px;
  width: 30%;
  padding: 4px;
  cursor: pointer;
`;

const NavLinksContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 55%;
  padding: 0px;
`;

const NavLi = styled.li`
  list-style: none;
  position: relative;
  letter-spacing: 2px;
  padding: 0px;
  width: 100%;
  text-align: center;
`;

const SubLi = styled(NavLi)`
  display: none;
  text-align: center;
  ${NavLi}:hover & {
    display: block;
  }
`;

const NavAnchor = styled.a`
  text-decoration: none;
  display: inline-block;
  text-transform: capitalize;
  width: 100%;
  padding: 20px;
  font-size: 1.1rem;
  padding-right: 16px;
  cursor: pointer;
`;

const Arrow = styled.i`
  display: inline-block;
  padding: 5px;
  font-size: 1rem;
  transition: 0.3s all ease;
  transform: ${props => (props.open ? 'rotate(-135deg)' : 'rotate(45deg)')};
`;

/**
 *
 * @param {{text:string} & anchorProps} props
 */

const NavLink = ({ text, children, ...props }) => {
  const [showSubMenu, updateShowMenu] = useState(false);
  function showSubMenuMouseEnterHandler() {
    updateShowMenu(true);
  }

  function showSubMenuMouseLeaveHandler() {
    updateShowMenu(false);
  }

  const navLink = children ? (
    <NavLi>
      <NavAnchor
        {...props}
        onMouseEnter={showSubMenuMouseEnterHandler}
        onMouseLeave={showSubMenuMouseLeaveHandler}>
        {text}
        <Arrow open={showSubMenu} />
      </NavAnchor>
      {children}
    </NavLi>
  ) : (
    <NavLi>
      <NavAnchor {...props}>{text}</NavAnchor>
    </NavLi>
  );
  return navLink;
};

const SubNavLinkContainer = styled.ul`
  position: absolute;
  display: flex;
  left: 0%;
  top: 100%;
  width: 100%;
  z-index: 1;
  flex-direction: column;
  padding: 0;
`;

/**
 *
 * @param {{text:string} & anchorProps} props
 */

const SubNavLink = ({ text, children, ...props }) => {
  return (
    <SubLi>
      <NavAnchor {...props}>{text}</NavAnchor>
      {children ? children : null}
    </SubLi>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 7vh;
  background: ${props =>
    props.customColorsObj ? props.customColorsObj.bgColor : '#1a69a4'};
  ${Arrow} {
    border: ${props =>
      props.customColorsObj
        ? `solid ${props.customColorsObj.fontColor}`
        : 'solid rgb(226, 226, 226)'};
    border-width: 0 3px 3px 0;
    margin-left: 10px;
  }
  ${NavAnchor} {
    color: ${props =>
      props.customColorsObj
        ? props.customColorsObj.fontColor
        : 'rgb(226, 226, 226)'};
  }
  ${SubLi} {
    border-bottom: ${props =>
      `0.5px solid ${
        props.customColorsObj ? props.customColorsObj.fontColor : '#74b7e9'
      }`};
    border-top: ${props =>
      `0.5px solid ${
        props.customColorsObj ? props.customColorsObj.fontColor : '#74b7e9'
      }`};
  }
  ${NavLi}:hover {
    background-color: ${props =>
      props.customColorsObj ? props.customColorsObj.hoverBgColor : '#74b7e9'};
  }
  ${NavLogo} {
    color: ${props =>
      props.customColorsObj
        ? props.customColorsObj.fontColor
        : 'rgb(226, 226, 226)'};
    margin-left: 1em;
  }
  ${SubNavLinkContainer} {
    background-color: ${props =>
      props.customColorsObj ? props.customColorsObj.bgColor : '#1a69a4'};
  }
  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

/**
 * @param {{
 * customColorsObj:customColorType,
 * children:ReactChildren
 * }& React.HTMLProps<HTMLDivElement>} props
 */

function Nav({ children, customColorsObj, ...props }, ref) {
  console.log('nav');
  return (
    <NavbarContainer customColorsObj={customColorsObj} {...props} ref={ref}>
      {children}
    </NavbarContainer>
  );
}

const Navbar = React.memo(React.forwardRef(Nav));

export {
  Navbar,
  NavLogo,
  NavLinksContainer,
  SubNavLinkContainer,
  NavLink,
  SubNavLink,
};
