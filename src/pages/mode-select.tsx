/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import { H1, H3 } from "@/components/ui/text";
import { useSettingStore } from "@/contexts/setting.store";
import { useA11y } from "@/hooks/use-a11y";
import { useCheckClick } from "@/hooks/use-check-click";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PropsWithChildren, useRef } from "react";
import { Link } from "react-router-dom";

const ModeSelect = () => {
  const { changeMode } = useSettingStore((state) => ({
    changeMode: state.onChangeMode,
  }));

  useA11y("user_type");

  return (
    <ModeSelectShell>
      <div
        css={css`
          flex: 1;
        `}
      />
      <div
        css={css`
          flex: 1;
          width: 100%;
          text-align: center;
        `}
      >
        <H1>
          <ModeColoredTitle>사용자 환경</ModeColoredTitle>을 선택해주세요
        </H1>
        <ModeSelectList>
          <ModelSelectCard
            data-a11y-id="터치안내"
            to="birthday"
            onDoubleClick={() => {
              changeMode("normal");
            }}
          >
            <div>
              <svg
                id="그룹_778"
                data-name="그룹 778"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="200"
                height="200"
                viewBox="0 0 200 200"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="사각형_970"
                      data-name="사각형 970"
                      width="200"
                      height="200"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="8"
                    />
                  </clipPath>
                </defs>
                <g
                  id="그룹_777"
                  data-name="그룹 777"
                  clipPath="url(#clip-path)"
                >
                  <path
                    id="패스_3333"
                    data-name="패스 3333"
                    d="M109.471,45.026V30.411c0-7.3,7.313-13.277,14.621-13.277a13.322,13.322,0,0,1,13.292,13.277V93.047a31.1,31.1,0,0,1-31.113,31.092H45.215A31.116,31.116,0,0,1,17.23,106.631L7.251,86.093A31.815,31.815,0,0,1,15.722,47.56L25.569,39.5"
                    transform="translate(39.665 70.733)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <path
                    id="패스_3334"
                    data-name="패스 3334"
                    d="M47.076,54.195V29.323c0-7.3-6.646-13.277-13.954-13.277S19.163,22.02,19.163,29.323V54.195"
                    transform="translate(102.06 66.241)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <path
                    id="패스_3335"
                    data-name="패스 3335"
                    d="M13.721,54.385V29.277c0-7.3,6.646-13.277,13.954-13.277s13.954,5.974,13.954,13.277V54.385"
                    transform="translate(79.594 66.051)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <path
                    id="패스_3336"
                    data-name="패스 3336"
                    d="M8.279,105.436V21.277C8.279,13.974,14.925,8,22.233,8s13.959,5.974,13.959,13.277V87.41"
                    transform="translate(57.129 33.026)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <line
                    id="선_6"
                    data-name="선 6"
                    x1="19.846"
                    transform="translate(22.951 51.223)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <line
                    id="선_7"
                    data-name="선 7"
                    x1="14.036"
                    y1="13.954"
                    transform="translate(38.977 13.266)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <line
                    id="선_8"
                    data-name="선 8"
                    y1="19.733"
                    transform="translate(79.623 0.001)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <line
                    id="선_9"
                    data-name="선 9"
                    y1="13.954"
                    x2="14.031"
                    transform="translate(106.08 13.634)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                  <line
                    id="선_10"
                    data-name="선 10"
                    x2="19.846"
                    transform="translate(115.926 51.744)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  />
                </g>
              </svg>
            </div>
            <div>
              <H3>터치 안내</H3>
            </div>
          </ModelSelectCard>
          <ModelSelectCard
            data-a11y-id="음성안내"
            to="menu"
            onDoubleClick={() => {
              changeMode("sound");
            }}
          >
            <div>
              <svg
                id="그룹_780"
                data-name="그룹 780"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="200"
                height="200"
                viewBox="0 0 200 200"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="사각형_971"
                      data-name="사각형 971"
                      width="200"
                      height="200"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="9"
                    />
                  </clipPath>
                </defs>
                <g
                  id="그룹_779"
                  data-name="그룹 779"
                  clipPath="url(#clip-path)"
                >
                  <path
                    id="패스_3337"
                    data-name="패스 3337"
                    d="M31.667,31.667H1v76.667H31.667l71.556,35.778V1Z"
                    transform="translate(11.816 27.445)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="9"
                  />
                  <path
                    id="패스_3338"
                    data-name="패스 3338"
                    d="M29.942,130.323a90.528,90.528,0,0,0,0-127.88"
                    transform="translate(130.799 33.377)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="9"
                  />
                  <path
                    id="패스_3339"
                    data-name="패스 3339"
                    d="M26.869,93.309a61.488,61.488,0,0,0,.005-86.853"
                    transform="translate(118.166 49.875)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="9"
                  />
                </g>
              </svg>
            </div>
            <div>
              <H3>음성 안내</H3>
              <p>시각장애인</p>
            </div>
          </ModelSelectCard>
          <ModelSelectCard
            to="menu"
            onDoubleClick={() => {
              changeMode("wheel");
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="200"
                height="200"
                viewBox="0 0 200 200"
              >
                <defs>
                  <clipPath id="clip-path2">
                    <rect
                      id="사각형_1238"
                      data-name="사각형 1238"
                      width="200"
                      height="200"
                      transform="translate(1357 1288)"
                      fill="#fff"
                      stroke="#707070"
                      strokeWidth="1"
                    />
                  </clipPath>
                  <clipPath id="clip-path-2">
                    <rect
                      id="사각형_1237"
                      data-name="사각형 1237"
                      width="173.346"
                      height="191.259"
                      fill="#fff"
                    />
                  </clipPath>
                </defs>
                <g
                  id="마스크_그룹_16"
                  data-name="마스크 그룹 16"
                  transform="translate(-1357 -1288)"
                  clipPath="url(#clip-path2)"
                >
                  <g
                    id="그룹_892"
                    data-name="그룹 892"
                    transform="translate(1370.333 1292.667)"
                  >
                    <g
                      id="그룹_891"
                      data-name="그룹 891"
                      clipPath="url(#clip-path-2)"
                    >
                      <path
                        id="패스_3345"
                        data-name="패스 3345"
                        d="M53.336,138.319a53.336,53.336,0,0,0,0-106.672,3.341,3.341,0,0,0,0,6.682A46.654,46.654,0,1,1,6.682,84.983a3.341,3.341,0,1,0-6.682,0,53.4,53.4,0,0,0,53.336,53.336"
                        transform="translate(66.673 52.941)"
                        fill="#fff"
                      />
                      <path
                        id="패스_3346"
                        data-name="패스 3346"
                        d="M42.643,110.544A36.253,36.253,0,1,0,6.392,74.292a36.293,36.293,0,0,0,36.251,36.251m0-65.824A29.571,29.571,0,1,1,13.074,74.292,29.6,29.6,0,0,1,42.643,44.72"
                        transform="translate(77.366 63.632)"
                        fill="#fff"
                      />
                      <path
                        id="패스_3347"
                        data-name="패스 3347"
                        d="M43.32,40.632A20.316,20.316,0,1,0,23,20.316,20.34,20.34,0,0,0,43.32,40.632m0-33.95A13.634,13.634,0,1,1,29.686,20.316,13.648,13.648,0,0,1,43.32,6.682"
                        transform="translate(48.224 0.001)"
                        fill="#fff"
                      />
                      <path
                        id="패스_3348"
                        data-name="패스 3348"
                        d="M32.7,153.423H52.742a3.342,3.342,0,0,0,3.341-3.341V103.308c0-8.323,6.34-10.245,7.687-10.558H120.9a3.342,3.342,0,0,0,3.341-3.341V16.043a3.341,3.341,0,1,0-6.682,0V86.068H63.433a3.484,3.484,0,0,0-.577.048C58.2,86.932,49.4,91.572,49.4,103.308v43.433H32.7a3.341,3.341,0,1,0,0,6.682"
                        transform="translate(-29.355 21.249)"
                        fill="#fff"
                      />
                      <path
                        id="패스_3349"
                        data-name="패스 3349"
                        d="M32.7,29.253h48.37a3.341,3.341,0,1,0,0-6.682H32.7a3.341,3.341,0,1,0,0,6.682"
                        transform="translate(10.478 37.758)"
                        fill="#fff"
                      />
                      <path
                        id="패스_3350"
                        data-name="패스 3350"
                        d="M5.673,77.723a3.347,3.347,0,0,0,3.13-2.17L29.838,19.383h31.1a3.341,3.341,0,0,0,0-6.682H27.523a3.342,3.342,0,0,0-3.13,2.17L2.543,73.211a3.338,3.338,0,0,0,3.13,4.512"
                        transform="translate(102.844 21.247)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              <H3>휠체어 안내</H3>
              <p>휠체어장애인</p>
            </div>
          </ModelSelectCard>
          <ModelSelectCard
            to="manual"
            onDoubleClick={() => {
              // changeMode("sign");
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="180.995"
                height="179"
                viewBox="0 0 180.995 179"
              >
                <g
                  id="그룹_893"
                  data-name="그룹 893"
                  transform="translate(-3150 -704)"
                >
                  <text
                    id="_"
                    data-name="?"
                    transform="translate(3209 829)"
                    fill="#fff"
                    fontSize="120"
                    fontFamily="NanumSquareRoundOTFR, NanumSquareRoundOTF"
                  >
                    <tspan x="0" y="0">
                      ?
                    </tspan>
                  </text>
                  <g
                    id="타원_99"
                    data-name="타원 99"
                    transform="translate(3150 704)"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="10"
                  >
                    <ellipse
                      cx="90.498"
                      cy="89.5"
                      rx="90.498"
                      ry="89.5"
                      stroke="none"
                    />
                    <ellipse
                      cx="90.498"
                      cy="89.5"
                      rx="85.498"
                      ry="84.5"
                      fill="none"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div>
              <H3>사용법 안내</H3>
            </div>
          </ModelSelectCard>
        </ModeSelectList>
      </div>
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
  ...rest
}: PropsWithChildren<ModelSelectCardProps>) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useCheckClick({
    ref,
    onFirstClick,
    onDoubleClick,
    onBlur,
  });

  return (
    <ModelSelectCardWrapper ref={ref} to={to} {...rest}>
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
  width: 100%;
  align-items: center;
  padding: 0 2.8rem;
  margin-top: 1.6rem;
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
  border-radius: 0.8rem;
  width: 16rem;
  aspect-ratio: 800/570;
  justify-content: center;
  > div:first-of-type > svg {
    flex: 1;
  }
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    p {
      font-size: calc(var(--font-size) * 1.4);
    }
  }
`;
