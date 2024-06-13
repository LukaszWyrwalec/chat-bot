import { useEffect, useState } from "react";

import useChatGPT from "../hooks/useChatGPT.hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  SChatActions,
  SChatBody,
  SChatError,
  SChatHeader,
  SChatList,
  SChatListItem,
  SChatListItemIcon,
  SChatListItemMessage,
  SChatOpenButton,
  SChatWelcomeBox,
  SChatWrapper,
  SIconButton,
  STextField,
} from "./chat.styles";

enum EChatState {
  closed,
  popup,
  window,
}

const Chat: React.FC = () => {
  const [chatState, setChatState] = useState<EChatState>(EChatState.closed);
  const [input, setInput] = useState("");

  const { messages, sendMessage, loading, error, clearCache, clearErrors } =
    useChatGPT();

  const isChatOpen =
    chatState === EChatState.window || chatState === EChatState.popup;

  const isChatWindow = chatState === EChatState.window;

  const handleSend = (): void => {
    if (!input.trim()) return;

    sendMessage(input);
    setInput("");
  };

  const closeChat = (): void => {
    setChatState(EChatState.closed);
    clearErrors();
  };

  const toggleChat = (): void => {
    if (chatState === EChatState.closed) {
      setChatState(EChatState.popup);
      return;
    }

    if (isChatOpen) closeChat();
  };

  const checkIsUserRole = (role: string): boolean => role === "user";

  useEffect(() => {
    if (messages.length && isChatOpen) setChatState(EChatState.window);
    if (!messages.length && isChatOpen) setChatState(EChatState.popup);
  }, [messages, chatState, isChatOpen]);

  return (
    <>
      <SChatOpenButton title="open chat" onClick={toggleChat}></SChatOpenButton>

      {isChatOpen && (
        <SChatWrapper isWindow={isChatWindow} isOpened={isChatOpen}>
          <SChatHeader>
            <SIconButton title="clear cache" onClick={clearCache}>
              <FontAwesomeIcon icon={faBars} />
            </SIconButton>

            <SIconButton title="close chat" onClick={closeChat}>
              <FontAwesomeIcon icon={faX} />
            </SIconButton>
          </SChatHeader>
          <SChatBody>
            {!messages.length ? (
              <SChatWelcomeBox>
                <p>Hi, I'm Ivy!</p>
                <span>
                  I'm a virtual assistant here to answer your questions.
                </span>
              </SChatWelcomeBox>
            ) : (
              <SChatList>
                {messages.map(({ content, role }, index) => {
                  const isUser = checkIsUserRole(role);

                  return (
                    <SChatListItem isUser={isUser} key={index}>
                      {!isUser && <SChatListItemIcon />}
                      <SChatListItemMessage isUser={isUser}>
                        {content}
                      </SChatListItemMessage>
                    </SChatListItem>
                  );
                })}
              </SChatList>
            )}

            <SChatActions>
              <STextField>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                />
                <SIconButton
                  title="send message"
                  onClick={handleSend}
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </SIconButton>
              </STextField>
              {error && <SChatError>{error}</SChatError>}
            </SChatActions>
          </SChatBody>
        </SChatWrapper>
      )}
    </>
  );
};

export default Chat;
