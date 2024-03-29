/** @jsxImportSource @emotion/react */
import { sendA11yEvent } from "@/libs/utils";
import styled from "@emotion/styled";
import Switch from "../common/switch";
import { P3 } from "./text";
import { css } from "@emotion/react";
import { useSettingStore } from "@/contexts/setting.store";

const SignController = () => {
  const { signActivate, setSignActivate } = useSettingStore(
    ({ signActivate, setSignActivate }) => ({
      signActivate,
      setSignActivate,
    })
  );
  return (
    <SignControllerWrapper>
      <P3
        css={css`
          margin-bottom: 0.5rem;
          line-height: 1.2;
        `}
      >
        수어켜기 / 끄기
      </P3>
      <div
        css={css`
          display: flex;
          column-gap: 3rem;
          position: relative;
          & button:first-of-type {
            position: relative;
            &::before {
              content: "";
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: -1.5rem;
              width: 2rem;
              background-color: gray;
              height: 4px;
            }
          }
          & button + button {
            position: relative;
            &:not(:last-child) {
              &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: calc(100% + 3rem);
                background-color: gray;
                height: 4px;
              }
            }
            &:last-of-type {
              &::before {
                content: "";
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: -1.5rem;
                width: 2rem;
                background-color: gray;
                height: 4px;
              }
            }
          }
        `}
      >
        <Switch
          data-a11y-id="sign_language"
          tabIndex={1}
          isOpen={signActivate}
          setIsOpen={(state) => {
            sendA11yEvent(state ? "sign_language_on" : "sign_language_off");
            setSignActivate(state);
          }}
        />
      </div>
    </SignControllerWrapper>
  );
};

export default SignController;

const SignControllerWrapper = styled.div`
  width: 16rem;
  height: 5.4rem;
  padding-top: 0.8rem;
  display: flex;
  background-color: white;
  border-radius: 0.4rem;

  overflow: hidden;
  box-shadow: 0 0 0.9rem rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.secondary.foreground};
`;
