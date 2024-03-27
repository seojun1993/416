/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";

import { H1, P3 } from "@/components/ui/text";
import styled from "@emotion/styled";
import timelineImage from "@/assets/images/timeline.png";
import ImageX from "@/components/ui/image";
import { css } from "@emotion/react";
import { useA11y } from "@/hooks/use-a11y";
import { useSettingStore } from "@/contexts/setting.store";
const Timeline = () => {
  const mode = useSettingStore((state) => state.mode);
  useA11y(mode === "sound" ? "timeline_detail" : "timeline");
  return (
    <MemoryShell>
      <MemoryHeader>
        <H1>세월호 타임라인</H1>
      </MemoryHeader>
      <div
        css={css`
          display: flex;
          flex-grow: 1;
          overflow: hidden;
          width: 100%;
          column-gap: 2rem;
        `}
      >
        <button
          data-disable-focus-effect
          css={css`
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 0.8rem;
            overflow: hidden;
            border: none;
            flex: 1;
            display: flex;
            padding: 0.2rem;
            transition: transform 0.1s ease-in-out,
              outline 0.1s ease-in-out 0.05s;
            &:focus {
              transform: scale(0.97);
            }
          `}
        >
          <div
            css={css`
              flex: 1;
              background-color: transparent;
              border: none;
              border-radius: 0.6rem;
              overflow: hidden;
              height: 100%;
            `}
          >
            <ImageX src={timelineImage} />
          </div>
        </button>
        <div
          css={css`
            flex: 1;
            overflow-y: scroll;
            padding-right: 1rem;
          `}
        >
          <b
            css={css`
              font-family: "Pretendard";
              font-size: calc(var(--font-size) * 1.4);
              line-height: calc(var(--font-size) * 1.6);
            `}
          >
            세월호 참사는
            <br />
            <br />
          </b>
          <TimelineDescription>
            <b>2014년 4월 15일</b> 인천 연안여객터미널을 출발, 제주로 향하던
            여객선 세월호가 <b>4월 16일</b> 전남 진도군 병풍도 앞 인근 해상에서
            침몰해 304명의 사망·실종자가 발생한 대형 참사입니다.
            <br />
            <br />이 사고로 탑승객 476명 가운데 172명만이 생존했고, 304명의
            사망·실종자가 발생했습니다. 특히 세월호에는 제주도로 수학여행을 떠난
            안산 단원고 2학년 학생 325명이 탑승해, 어린 학생들의 피해가 가장
            컸습니다.
            <br />
            <br />
            무리한 화물 적재와 증축으로 인해, <b>4월 16일 오전 8시 49분경 </b>
            좌현부터 세월호의 침몰이 시작되었고, 침몰 중에도 선내에서는 '가만히
            있으라'라는 방송만이 반복되어, 제대로 된 구조 작업이 이뤄지지
            않았습니다. 이처럼 세월호 참사는 엉뚱한 교신으로 인한 초기 대응시간
            지연, 선장과 선원들의 무책임, 해경의 소극적 구조와 정부의 뒷북 대처
            등 총체적 부실로 인해 최악의 인재로 이어진 참사입니다.
            <br />
            <br />
            교실에는 아이들과 선생님들을 그리워하며 추모하는 마음의 편지와 메모
            등이 쌓였고, 학생들이 공부했던 교실은 돌아오지 못한 희생자들을
            추모하는 기억의 공간이 되었습니다.
            <br />
            <br />
            이후 교실을 그대로 남겨달라는 시민들의 목소리가 커졌고,
            <br />
            <br />
            <b>2016년 5월 9일</b> 경기도교육청, 4.16세월호참사가족협의회,
            경기도, 경기도의회, 안산시, 경기도안산교육지원청, 단원고등학교는
            협약을 통해 4.16민주시민교육원 기관이 설립되고 단원고 4.16기억교실로
            기억관 2층, 3층에 4.16기억저장소의 기록화 자료를 토대로 원형
            복원하였습니다.
            <br />
            <b>(소장기관: 4.16민주시민교육원, 4.16기억저장소)</b>
          </TimelineDescription>
        </div>
      </div>
    </MemoryShell>
  );
};

export default Timeline;

const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.6rem;
  padding-left: 7.6rem;
  padding-right: 7.6rem;
`;

const MemoryHeader = styled.div`
  text-align: center;
  margin-bottom: 1.6rem;
`;

const TimelineDescription = styled(P3)`
  color: white;
  font-weight: 400;
  line-height: calc(var(--font-size) * 1.6);
  text-align: start;
  b {
    color: ${(props) => props.theme.color.yellow};
  }
`;
