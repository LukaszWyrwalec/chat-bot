import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const CHAT_OPEN_BUTTON_SIZE = 80;
const CHAT_OPEN_BUTTON_POS_BOTTOM = 25;
const CHAT_OPEN_BUTTON_POS_RIGHT = 50;

const HEADER_BG_COLOR = "#2B6BD1";
const SYSTEM_BG_COLOR = "#EAEFF8";
const USER_BG_COLOR = "#1E6DEB";
const SYSTEM_TEXT_COLOR = "#373A43";
const USER_TEXT_COLOR = "#FFFFFF";
const MESSAGE_FONT_SIZE = 16;

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  to {
    transform: translateY(0);
    opacity: 1;
    }
`;

const BUTTON_STYLES = css`
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  transition: 300ms;

  border-radius: 50px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #00000033;
  }
`;

export const SIconButton = styled.button`
  ${BUTTON_STYLES}
  width: 35px;
  height: 35px;
`;

export const STextField = styled.div`
  display: flex;
  flex-direction: row;

  gap: 5px;
  position: relative;

  & > input {
    width: 100%;
    font-size: 16px;
    padding: 14px 55px 14px 20px;
    flex: 1;
    background-color: #f0f1f4;
    border: 1px solid #f0f1f4;
    outline: 0px;
    border-radius: 5px;
    overflow: hidden;

    &:hover {
      background-color: #f0f1f48a;
      border: 1px solid #f0f1f48a;
    }

    &:focus {
      background-color: #fff;
      border: 1px solid #5b7edd;
    }
  }

  & > button {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const SChatWrapper = styled.div<{
  isOpened: boolean;
  isWindow: boolean;
}>`
  position: fixed;
  bottom: ${CHAT_OPEN_BUTTON_POS_BOTTOM * 2 + CHAT_OPEN_BUTTON_SIZE}px;
  top: ${({ isWindow }) =>
    isWindow ? CHAT_OPEN_BUTTON_POS_BOTTOM + "px" : "auto"};
  right: ${CHAT_OPEN_BUTTON_POS_BOTTOM}px;
  transform: scale(1);
  max-width: 380px;
  width: 100%;
  z-index: 9998;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 20px 50px #00000027;
  border-radius: 9px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  transition: 500ms;
  animation: ${slideIn} 0.5s ease-out;
`;

export const SChatHeader = styled.div`
  padding: 18px 20px;
  background-color: ${HEADER_BG_COLOR};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > button {
    color: #fff;
  }
`;

export const SChatBody = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const SChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
`;

export const SChatActions = styled.div`
  padding-top: 30px;
`;

export const SChatListItem = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: ${({ isUser }) => (!isUser ? "row" : "row-reverse")};
  gap: 15px;
  align-items: center;
`;
export const SChatListItemIcon = styled.div`
  border-radius: 50%;
  background-color: #000000d5;
  width: 39px;
  height: 39px;
`;

export const SChatListItemMessage = styled.div<{ isUser: boolean }>`
  font-size: ${MESSAGE_FONT_SIZE}px;
  background-color: ${({ isUser }) =>
    isUser ? USER_BG_COLOR : SYSTEM_BG_COLOR};
  color: ${({ isUser }) => (isUser ? USER_TEXT_COLOR : SYSTEM_TEXT_COLOR)};
  border-radius: ${({ isUser }) =>
    isUser ? "9px 9px 2px 9px" : "9px 9px 9px 2px"};
  padding: 14px 18px;
`;

export const SChatOpenButton = styled.button`
  ${BUTTON_STYLES}
  position: fixed;
  background-color: #000;
  bottom: ${CHAT_OPEN_BUTTON_POS_BOTTOM}px;
  right: ${CHAT_OPEN_BUTTON_POS_RIGHT}px;
  width: ${CHAT_OPEN_BUTTON_SIZE}px;
  height: ${CHAT_OPEN_BUTTON_SIZE}px;
  z-index: 9999;
`;

export const SChatWelcomeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & p {
    text-align: center;
    font-size: 26px;
    color: #373a43;
    letter-spacing: -0.26px;
  }

  & span {
    font-size: 16px;
    color: #373a43;
  }
`;

export const SChatError = styled.div`
  color: red;
  padding-top: 15px;
  text-align: center;
`;
