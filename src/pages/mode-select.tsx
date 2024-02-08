import { MainShell } from "@/components/common/main-shell";
import { H1, H3 } from "@/components/ui/text";
import { useSettingStore } from "@/contexts/setting.store";
import { useCheckClick } from "@/hooks/use-check-click";
import styled from "@emotion/styled";
import { PropsWithChildren, useRef } from "react";
import { Link } from "react-router-dom";

const ModeSelect = () => {
  const { changeMode } = useSettingStore((state) => ({
    changeMode: state.onChangeMode,
  }));
  return (
    <ModeSelectShell>
      <H1>
        <ModeColoredTitle>사용자 환경</ModeColoredTitle>을 선택해주세요
      </H1>
      <ModeSelectList>
        <ModelSelectCard
          to="birthday"
          onDoubleClick={() => {
            changeMode("normal");
          }}
        >
          <svg
            id="그룹_778"
            data-name="그룹 778"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="300"
            height="300"
            viewBox="0 0 300 300"
          >
            <defs>
              <clipPath id="clipPath">
                <rect
                  id="사각형_970"
                  data-name="사각형 970"
                  width="300"
                  height="300"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                />
              </clipPath>
            </defs>
            <g id="그룹_777" data-name="그룹 777" clipPath="url(#clipPath)">
              <path
                id="패스_3333"
                data-name="패스 3333"
                d="M162.182,58.972V37.049c0-10.954,10.969-19.915,21.931-19.915a19.983,19.983,0,0,1,19.938,19.915V131a46.655,46.655,0,0,1-46.669,46.638H65.8A46.674,46.674,0,0,1,23.821,151.38L8.852,120.572a47.723,47.723,0,0,1,12.708-57.8L36.329,50.688"
                transform="translate(61.521 114.666)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <path
                id="패스_3334"
                data-name="패스 3334"
                d="M61.032,73.269V35.961c0-10.954-9.969-19.915-20.931-19.915S19.163,25.008,19.163,35.961V73.269"
                transform="translate(162.671 107.385)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <path
                id="패스_3335"
                data-name="패스 3335"
                d="M13.721,73.577V35.915C13.721,24.962,23.69,16,34.652,16s20.931,8.962,20.931,19.915V73.577"
                transform="translate(126.252 107.077)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <path
                id="패스_3336"
                data-name="패스 3336"
                d="M8.279,154.154V27.915C8.279,16.962,18.248,8,29.21,8s20.938,8.962,20.938,19.915v99.2"
                transform="translate(89.832 53.538)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <line
                id="선_6"
                data-name="선 6"
                x1="29.769"
                transform="translate(34.427 76.835)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <line
                id="선_7"
                data-name="선 7"
                x1="21.054"
                y1="20.931"
                transform="translate(58.466 19.899)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <line
                id="선_8"
                data-name="선 8"
                y1="29.6"
                transform="translate(119.435 0.001)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <line
                id="선_9"
                data-name="선 9"
                y1="20.931"
                x2="21.046"
                transform="translate(159.12 20.452)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <line
                id="선_10"
                data-name="선 10"
                x2="29.769"
                transform="translate(173.888 77.615)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="8"
              />
            </g>
          </svg>
          <div>
            <H3>일반 안내</H3>
          </div>
        </ModelSelectCard>
        <ModelSelectCard
          to="menu"
          onDoubleClick={() => {
            changeMode("sound");
          }}
        >
          <svg
            id="그룹_780"
            data-name="그룹 780"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="300"
            height="300"
            viewBox="0 0 300 300"
          >
            <defs>
              <clipPath id="clipPath">
                <rect
                  id="사각형_971"
                  data-name="사각형 971"
                  width="300"
                  height="300"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="9"
                />
              </clipPath>
            </defs>
            <g id="그룹_779" data-name="그룹 779" clipPath="url(#clipPath)">
              <path
                id="패스_3337"
                data-name="패스 3337"
                d="M47,47H1V162H47l107.333,53.667V1Z"
                transform="translate(18.223 41.668)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="9"
              />
              <path
                id="패스_3338"
                data-name="패스 3338"
                d="M29.942,194.263c52.885-52.885,52.885-138.935,0-191.82"
                transform="translate(211.17 51.288)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="9"
              />
              <path
                id="패스_3339"
                data-name="패스 3339"
                d="M26.869,136.736a92.233,92.233,0,0,0,.008-130.28"
                transform="translate(190.683 78.041)"
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="9"
              />
            </g>
          </svg>
          <div>
            <H3>음성 안내</H3>
            <p>시각장애인</p>
          </div>
        </ModelSelectCard>
        <ModelSelectCard
          to="birthday"
          onDoubleClick={() => {
            changeMode("sign");
          }}
        >
          <svg
            id="그룹_782"
            data-name="그룹 782"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="300"
            height="300"
            viewBox="0 0 300 300"
          >
            <defs>
              <clipPath id="clipPath">
                <rect
                  id="사각형_972"
                  data-name="사각형 972"
                  width="300"
                  height="300"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="3"
                />
              </clipPath>
            </defs>
            <g id="그룹_781" data-name="그룹 781" clipPath="url(#clipPath)">
              <path
                id="패스_3340"
                data-name="패스 3340"
                d="M260.411,256.358c-1.972.579-3.126.873-4.25,1.254-15.528,5.275-31.213,9.926-47.654,11.309-6.1.514-12.235.956-18.356,1-17.1.135-34.208.046-51.311.045-14.07,0-18.777-3.647-22.169-17.613h-4.3q-39.634,0-79.267-.017c-9.345-.016-15.8-4.476-17.812-12.529-.7-2.794-.476-5.818-.706-9.228C9.313,230,4.514,227.349,2.1,222.189a24,24,0,0,1-2.08-10.833c.328-7.428,6.448-12.787,15.43-14.489-1.229-10.144,5.5-18.283,15.825-18.817,5.53-.286,11.082-.126,16.625-.163,1.27-.008,2.54,0,3.274,0,1.218-3.7,1.783-7.155,3.425-9.988a13.294,13.294,0,0,1,11.661-6.879c5.777-.119,11.557-.083,17.335-.111,1.4-.006,2.792,0,4.561,0,.079-1.571.2-2.812.2-4.052.018-11.56.246-23.125-.039-34.678-.364-14.752,4.828-27.079,14.833-37.746a159.627,159.627,0,0,0,13.781-16.537c5.423-7.63,6.441-16.807,7.593-25.836,1.178-9.232,2.319-18.47,3.659-27.68,1.2-8.231,9.575-14.784,18.035-14.356,9.34.471,17.085,7.258,17.023,16.07-.079,11.3-1.072,22.6-1.675,33.9-.018.353-.074.7-.118,1.055-.708,5.7-.306,10.789,3.443,15.895a41.628,41.628,0,0,1,8.145,26.209c8.47-.677,15.8,1.025,19.867,8.884,3.933,7.6,2.249,14.584-3.892,20.993,5.429,1.07,9.852,3.427,12.243,7.96a22.011,22.011,0,0,1,2.492,9.7c.076,7.975-4.655,13.033-14.141,16.187,3,5.445,3,5.46,8.873,4.908,22.161-2.085,44.042-.911,65.4,5.833a128.072,128.072,0,0,1,13.471,5.272c1,.447,1.467,2.1,2.179,3.194-1.217.155-2.668.823-3.616.389-20.277-9.294-41.761-11.962-63.761-11.647-5.717.082-11.425.815-17.043,1.242-.932,13.351-4.476,18.2-14.993,20.77.52.69.947,1.33,1.445,1.908,8.739,10.135,3.75,26.1-9.492,27.47-14.209,1.465-28.766,2.425-42.85-1.667-15.922-4.626-27.389-14.865-34.848-29.514-1.379-2.708-2.9-3.335-5.651-3.32-18.045.1-36.089.04-54.134.046-4.075,0-7.968.513-11.2,3.441-3.429,3.108-4.339,7.086-4.524,11.8H23.2q30.079,0,60.158,0a11.06,11.06,0,0,1,3.156.2c.631.192,1.558,1.106,1.483,1.55a2.782,2.782,0,0,1-1.513,1.905,11.636,11.636,0,0,1-3.5.215q-31.671.012-63.343.022a33.85,33.85,0,0,0-5.985.413c-5.783,1.05-10.21,6.849-9.983,12.857C3.9,220.308,8.6,225.813,14.4,226.355a5.166,5.166,0,0,0,3.851-1.453,18.042,18.042,0,0,1,14.369-6.4q28.133-.047,56.266-.012c.354,0,.8-.13,1.045.037.93.639,1.794,1.374,2.683,2.073-.9.654-1.8,1.857-2.714,1.875-7.783.151-15.569.086-23.354.088-11.56,0-23.12-.091-34.679.044-8.047.094-13.386,5.725-13.146,13.48a12.571,12.571,0,0,0,11.216,12.1,44.978,44.978,0,0,0,4.593.176c26.422.011,52.845-.025,79.267.063,2.512.008,3.96-.516,5.157-2.983,3.059-6.3,8.391-9.322,15.406-9.326,11.088-.006,22.177-.08,33.264.037a8.784,8.784,0,0,0,6.556-2.549c12.7-11.585,27.125-19.867,44.389-22.526,1.683-.259,3.607-.881,3.869,1.445.077.684-1.852,2.138-3.015,2.334-17.343,2.93-31.806,11.237-44.447,23.191a8.493,8.493,0,0,1-5.283,1.971c-11.911.176-23.827.04-35.74.13a12.787,12.787,0,0,0-12.212,8.522c-1.8,5.528-.084,11.492,4.873,14.662a15.524,15.524,0,0,0,7.9,2.47c23-.013,45.995-.067,68.982-.6,14.1-.325,27.729-3.839,41.135-8.077,6.061-1.916,12.127-3.841,18.1-6.021M169.076,93.124c-.147-2.4-.125-4.269-.4-6.1-1.183-8-4.709-15.041-9.348-21.507a11.254,11.254,0,0,1-2.3-7.822c.884-12.821,1.629-25.651,2.414-38.478.5-8.092-4.786-14.523-12.49-15.233-7.564-.7-14.019,4.866-15.017,12.737-1.334,10.52-2.913,21.01-4.2,31.537a55.563,55.563,0,0,1-15.879,32.774c-3.12,3.213-6.127,6.548-9.017,9.97-6.526,7.727-10.261,16.636-10.353,26.813-.131,14.505-.316,29.02.033,43.519.617,25.606,18.929,46.955,44.288,50.647,10.409,1.515,21.167.725,31.768.806,7.613.058,13.244-5.442,13.279-12.633.035-7.432-5.571-12.942-13.324-12.986-8.61-.048-17.221.042-25.83-.057-1.886-.022-5.018,1.1-4.926-2.2.091-3.24,3.238-1.984,5.079-2,11.557-.118,23.118.044,34.676-.095,9.4-.113,15.458-8.218,12.788-16.8-1.7-5.464-6.324-8.711-13.042-8.8-12.146-.159-24.294-.115-36.438-.319-1-.017-1.985-1.285-2.978-1.973.966-.6,1.9-1.652,2.9-1.725,4.341-.314,8.7-.437,13.058-.454,11.087-.042,22.176.158,33.259-.023,7.6-.125,13.134-5.968,12.9-13.063-.236-7.251-5.837-12.535-13.464-12.572-10.143-.05-20.287.009-30.431-.025-5.069-.018-10.145-.029-15.2-.309-1.045-.058-2.027-1.29-3.037-1.981a25.673,25.673,0,0,1,3.131-1.876,5.678,5.678,0,0,1,2.1-.05c11.323,0,22.649.133,33.967-.1a17.453,17.453,0,0,0,8.006-2.16,12.714,12.714,0,0,0-6.567-23.4c-11.676-.147-23.353-.06-35.03-.07a8.238,8.238,0,0,1-2.806-.069,13.949,13.949,0,0,1-2.8-1.933c.9-.66,1.753-1.8,2.7-1.891,2.807-.256,5.653-.1,8.484-.1,6.47,0,12.94,0,20.031,0M56.039,177.671H90.825c-.728-3.9-1.268-7.589-2.206-11.179-.2-.766-1.829-1.617-2.821-1.643-5.874-.154-11.756-.188-17.631-.05-7.731.18-11.9,4.573-12.129,12.873"
                transform="translate(10.238 14.999)"
                fill="#fff"
                stroke="#fff"
                strokeWidth="3"
              />
            </g>
          </svg>
          <div>
            <H3>수어 안내</H3>
            <p>청각장애인</p>
          </div>
        </ModelSelectCard>
      </ModeSelectList>
    </ModeSelectShell>
  );
};

interface ModelSelectCardProps {
  to: string;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
}
const ModelSelectCard = ({
  to,
  children,
  onBlur,
  onDoubleClick,
  onFirstClick,
}: PropsWithChildren<ModelSelectCardProps>) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useCheckClick({
    ref,
    onFirstClick,
    onDoubleClick,
    onBlur,
  });

  return (
    <ModelSelectCardWrapper ref={ref} to={to}>
      {children}
    </ModelSelectCardWrapper>
  );
};

export default ModeSelect;

const ModeColoredTitle = styled.span`
  color: ${(props) => props.theme.color.accent.foreground};
`;

const ModeSelectShell = styled(MainShell)`
  align-items: center;
  flex-direction: column;
`;

const ModeSelectList = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;
  height: 100%;
  align-items: center;
`;
const ModelSelectCardWrapper = styled(Link)`
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border},
    inset 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.inner};
  border: 0.15rem solid white;
  text-decoration: none;
  border-radius: 0.8rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 20rem;
  border-radius: 0.8rem;
  aspect-ratio: 1/1;
  padding-top: 4rem;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.64rem;
    color: white;
    p {
      font-size: calc(var(--font-size) * 1.4);
    }
  }
`;
