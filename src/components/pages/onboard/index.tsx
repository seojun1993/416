/** @jsxImportSource @emotion/react */
import ImageX from "@/components/ui/image";
import { H4 } from "@/components/ui/text";
import { useCheckClick } from "@/hooks/use-check-click";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";

export const OnBoardTitle = () => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="2074"
      height="218"
      viewBox="0 0 2074 218"
      css={css`
        height: 4.216rem;
      `}
    >
      <defs>
        <clipPath id="clipPath">
          <rect
            id="사각형_130"
            data-name="사각형 130"
            width="2018.119"
            height="200"
            fill="#fff"
          />
        </clipPath>
        <filter
          id="타원_21"
          x="32"
          y="17"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_22"
          x="0"
          y="41"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-2" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_24"
          x="62"
          y="41"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-3" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-3" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_25"
          x="78"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-4" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-4" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_28"
          x="159"
          y="11"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-5" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-5" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_29"
          x="211"
          y="50"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-6" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-6" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_30"
          x="131"
          y="76"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-7" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-7" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_32"
          x="158"
          y="102"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-8" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-8" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_33"
          x="211"
          y="158"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-9" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-9" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_34"
          x="284"
          y="14"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-10" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-10" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_35"
          x="255"
          y="92"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-11" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-11" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_36"
          x="326"
          y="92"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-12" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-12" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_37"
          x="332"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-13" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-13" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_39"
          x="575"
          y="23"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-14" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-14" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_40"
          x="622"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-15" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-15" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_41"
          x="637"
          y="82"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-16" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-16" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_42"
          x="754"
          y="23"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-17" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-17" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_43"
          x="756"
          y="61"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-18" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-18" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_44"
          x="696"
          y="88"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-19" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-19" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_45"
          x="770"
          y="88"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-20" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-20" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_48"
          x="741"
          y="106"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-21" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-21" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_49"
          x="796"
          y="139"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-22" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-22" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_46"
          x="779"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-23" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-23" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_50"
          x="877"
          y="23"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-24" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-24" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_51"
          x="921"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-25" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-25" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_52"
          x="961"
          y="45"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-26" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-26" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_54"
          x="996"
          y="23"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-27" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-27" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_55"
          x="1042"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-28" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-28" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_56"
          x="1058"
          y="82"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-29" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-29" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_57"
          x="1150"
          y="13"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-30" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-30" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_58"
          x="1150"
          y="51"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-31" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-31" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_59"
          x="1079"
          y="76"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-32" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-32" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_60"
          x="1174"
          y="76"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-33" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-33" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_61"
          x="1101"
          y="103"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-34" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-34" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_62"
          x="1156"
          y="158"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-35" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-35" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_63"
          x="1215"
          y="21"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-36" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-36" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_64"
          x="1258"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-37" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-37" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_65"
          x="1275"
          y="84"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-38" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-38" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_66"
          x="1300"
          y="47"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-39" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-39" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_67"
          x="1711"
          y="0"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-40" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-40" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_68"
          x="1683"
          y="16"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-41" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-41" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_69"
          x="1738"
          y="16"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-42" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-42" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_70"
          x="1664"
          y="76"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-43" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-43" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_71"
          x="1760"
          y="76"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-44" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-44" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_72"
          x="1682"
          y="103"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-45" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-45" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_73"
          x="1737"
          y="138"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-46" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-46" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_74"
          x="1804"
          y="21"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-47" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-47" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_75"
          x="1848"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-48" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-48" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_76"
          x="1888"
          y="43"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-49" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-49" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_77"
          x="1935"
          y="21"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-50" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-50" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_78"
          x="1971"
          y="10"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-51" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-51" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_79"
          x="1997"
          y="2"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-52" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-52" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_80"
          x="1987"
          y="82"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-53" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-53" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_81"
          x="2014"
          y="82"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-54" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-54" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_53"
          x="937"
          y="82"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-55" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-55" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_47"
          x="793"
          y="94"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-56" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-56" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_38"
          x="346"
          y="94"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-57" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-57" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_31"
          x="240"
          y="76"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-58" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-58" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_26"
          x="115"
          y="44"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-59" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-59" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="타원_27"
          x="92"
          y="82"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="8" result="blur-60" />
          <feFlood floodColor="#fff" floodOpacity="0.8" />
          <feComposite operator="in" in2="blur-60" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="title" transform="translate(-886 -136)">
        <g id="그룹_196" data-name="그룹 196" transform="translate(915 138)">
          <g id="그룹_195" data-name="그룹 195" clipPath="url(#clipPath)">
            <path
              id="패스_871"
              data-name="패스 871"
              d="M0,55.374H30.075V35.941H36.4V55.374H66.315V61.08H48.426a19.366,19.366,0,0,1,6.94,14.8C55.367,87.3,46.421,96.4,33.158,96.4S10.95,87.3,10.95,75.883a18.874,18.874,0,0,1,6.94-14.8H0ZM49.043,75.73c0-8.483-6.169-14.8-15.886-14.8s-15.884,6.322-15.884,14.8c0,8.791,6.167,14.806,15.884,14.806S49.043,84.521,49.043,75.73M89.913,28.075,76.495,20.209l2.468-4.625,17.274,8.944v33.62H119.06v6.015H96.236v37.013H89.913Z"
              transform="translate(0 11.122)"
              fill="#fff"
            />
            <path
              id="패스_872"
              data-name="패스 872"
              d="M75.24,86.388H186.28V92.4H75.24Zm28.068-64.775h6.323v38.71h49.813v6.013H103.308Zm.925,117.518h46.73V118.157h-46.73v-6.169h52.9V145.3H110.4v22.362h50.586v6.169H104.233Z"
              transform="translate(53.696 15.424)"
              fill="#fff"
            />
            <path
              id="패스_873"
              data-name="패스 873"
              d="M152.1,105.341h72.121v6.015H152.1Zm7.811-41.023c0-11.567,7.866-21.128,20.665-22.516V30.388h6.169V41.8C199.39,43.189,207.41,52.75,207.41,64.317c0,12.647-9.254,22.826-23.751,22.826s-23.75-10.179-23.75-22.826m6.015,0c0,9.254,7.095,16.811,17.735,16.811S201.4,73.571,201.4,64.317c0-9.1-7.095-16.809-17.736-16.809s-17.735,7.711-17.735,16.809m75.261-36.242-13.264-7.866,2.468-4.625,17.274,8.944v90.067h-6.478Z"
              transform="translate(102.124 11.122)"
              fill="#fff"
            />
            <path
              id="패스_874"
              data-name="패스 874"
              d="M244.953,48.682l-9.991-8.172,7.448-10.537c6.358,4,12.9,7.629,19.255,11.625v14.17H290.73V42.142c-3.451-2.543-6.9-5.449-10.354-8.174l7.448-10.536c6.539,4,13.079,7.811,19.618,11.627v64.3H244.953ZM290.73,68.846H261.666V86.1H290.73ZM296,152.225h50.863V133.15H296V118.8h68.3v46.684H313.618v19.981h54.5V200H296Zm51.226-78.474V55.4H316.342V41.416h30.882V21.8c-5.268-3.271-10.536-6.723-15.805-9.811C333.6,7.993,335.962,4,337.96,0l26.7,12.9V103.9H347.224V87.738H316.342V73.751Z"
              transform="translate(167.684)"
              fill={theme.color.accent.foreground}
              style={{
                transition: "fill 0.2s ease-in-out",
              }}
            />
            <path
              id="패스_875"
              data-name="패스 875"
              d="M349.769,51.979c13.42,1.39,21.438,10.952,21.438,22.672,0,12.8-9.254,22.979-24.521,22.979S322.164,87.45,322.164,74.651c0-11.72,7.866-21.282,21.284-22.672V39.488h6.322Zm15.269,22.672c0-9.254-6.94-16.965-18.352-16.965S328.333,65.4,328.333,74.651c0,9.408,6.94,16.964,18.353,16.964s18.352-7.556,18.352-16.964m46.421,26.526h-6.322v-73.1l-13.42-7.866,2.468-4.625,17.274,8.942Z"
              transform="translate(229.917 11.122)"
              fill="#fff"
            />
            <path
              id="패스_876"
              data-name="패스 876"
              d="M426.5,75.576h44.879v6.015H447.632V102.1h36.551v6.015H404.6V102.1h36.707V81.591h-21.13V37.329h46.113v6.015H426.5ZM449.792,124h6.323v29.61h54.6v6.168H449.792Zm52.9-95.929-13.264-7.866,2.468-4.625,17.274,8.944v90.067h-6.478Z"
              transform="translate(288.751 11.122)"
              fill="#fff"
            />
            <path
              id="패스_877"
              data-name="패스 877"
              d="M525.629,51.979c13.418,1.39,21.438,10.952,21.438,22.673,0,12.8-9.254,22.977-24.523,22.977S498.022,87.45,498.022,74.652c0-11.721,7.866-21.284,21.284-22.673V39.488h6.323ZM540.9,74.652c0-9.256-6.94-16.967-18.354-16.967S504.191,65.4,504.191,74.652c0,9.406,6.94,16.962,18.353,16.962S540.9,84.059,540.9,74.652m38.556-46.577-13.418-7.866,2.468-4.625,17.272,8.944V59.69H608.6v6.015H585.775v35.471h-6.322Z"
              transform="translate(355.42 11.122)"
              fill="#fff"
            />
            <path
              id="패스_878"
              data-name="패스 878"
              d="M595.288,51.979c13.416,1.39,21.436,10.952,21.436,22.672,0,12.8-9.254,22.979-24.521,22.979S567.683,87.45,567.683,74.651c0-11.72,7.864-21.282,21.282-22.672V39.488h6.323Zm15.267,22.672c0-9.254-6.94-16.965-18.352-16.965S573.85,65.4,573.85,74.651c0,9.408,6.94,16.964,18.354,16.964s18.352-7.556,18.352-16.964m46.421,26.526h-6.322v-73.1l-13.419-7.866,2.469-4.625,17.272,8.942Z"
              transform="translate(405.135 11.122)"
              fill="#fff"
            />
            <path
              id="패스_879"
              data-name="패스 879"
              d="M633.822,85.913h95.042v6.015H633.822Zm21,52.9h46.73V117.837h-46.73v-6.169h52.9V144.98H660.986v22.363H711.57v6.167H654.817ZM661.6,60.928h46.111v6.015H655.28V22.062h50.43v6.017H661.6Z"
              transform="translate(446.627 15.745)"
              fill="#fff"
            />
            <path
              id="패스_880"
              data-name="패스 880"
              d="M723.358,51.979c13.416,1.39,21.436,10.952,21.436,22.673,0,12.8-9.254,22.977-24.521,22.977S695.751,87.45,695.751,74.652c0-11.721,7.866-21.284,21.282-22.673V39.488h6.325Zm15.267,22.673c0-9.256-6.94-16.967-18.352-16.967S701.92,65.4,701.92,74.652c0,9.406,6.94,16.962,18.353,16.962s18.352-7.556,18.352-16.962m38.556-46.577-13.416-7.866,2.466-4.625L783.5,24.528V59.69H806.33v6.015H783.5v35.471h-6.323Z"
              transform="translate(496.532 11.122)"
              fill="#fff"
            />
            <path
              id="패스_881"
              data-name="패스 881"
              d="M772.827,67.241A5.872,5.872,0,0,1,779,73.256a25.967,25.967,0,0,1-1.08,5.242l-7.249,23.134h-5.707l6.632-22.516c-3.393-.464-4.781-3.239-4.781-5.861a5.832,5.832,0,0,1,6.015-6.015"
              transform="translate(545.925 47.987)"
              fill="#fff"
            />
            <path
              id="패스_882"
              data-name="패스 882"
              d="M831.257,64.389V35.769h17.479v28.62C857.99,73.3,866.9,82.383,875.986,91.467c-3.256,3.258-6.855,6.685-10.111,10.112-8.741-7.885-17.31-15.939-25.88-23.823l-28.447,25.366c-3.258-3.256-6.512-6.683-9.6-10.111Zm73.52,103.169c-15.766,0-29.82-10.626-29.82-26.737s14.054-26.733,29.82-26.733c15.939,0,29.82,10.625,29.82,26.733s-13.881,26.737-29.82,26.737M890.725,33.2c-4.627-3.085-9.6-6-14.225-9.082l5.826-11.139,24.337,11.651V56.164h18.165V25.83c-4.97-3.258-9.941-6.342-14.911-9.425l5.826-11.139c8.227,4.111,16.8,8.053,25.021,12.165v85.861H924.829V70.217H906.664v33.075H890.725Zm14.052,121.334c7.028,0,14.052-5.314,14.052-13.711,0-8.226-7.024-13.538-14.052-13.538-7.369,0-14.225,5.312-14.225,13.538,0,8.4,6.856,13.711,14.225,13.711"
              transform="translate(572.323 3.758)"
              fill={theme.color.accent.foreground}
              style={{
                transition: "fill 0.2s ease-in-out",
              }}
            />
            <path
              id="패스_883"
              data-name="패스 883"
              d="M934.2,44.339c14.052,3.083,22.62,14.223,22.62,27.42,0,15.766-11.824,28.277-31.017,28.277-19.025,0-30.849-12.511-30.849-28.277,0-13.2,8.4-24.337,22.622-27.42v-13.2H934.2Zm6.855,27.42c0-9.082-6.169-15.253-15.252-15.253-8.913,0-15.082,6.171-15.082,15.253,0,8.911,6.169,15.079,15.082,15.079,9.083,0,15.252-6.167,15.252-15.079m.857,77.12h47.986v-18H941.907v-13.54h64.609v44.045H958.529v18.85h51.244v13.709H941.907Zm64.78-45.587H990.064V25.83c-4.8-3.085-9.768-6.341-14.568-9.256,1.885-3.77,3.943-7.54,6-11.308l25.191,12.165Z"
              transform="translate(638.693 3.758)"
              fill={theme.color.accent.foreground}
              style={{
                transition: "fill 0.2s ease-in-out",
              }}
            />
            <path
              id="패스_884"
              data-name="패스 884"
              d="M975.628,89.945h94.042V95.96h-44.436v20.2H1051.3v39.79h-6.323v-33.62h-54.75v-6.169h28.841V95.96H975.628Zm43.436-43.183v-10.8H992.845V30.26h26.219v-14.5h6.169v14.5h26.526v5.707h-26.526v10.8l27.76,22.363-3.547,4.317-27.3-20.974-27.3,20.974L991.3,69.126Z"
              transform="translate(689.848 11.25)"
              fill="#fff"
            />
            <path
              id="패스_885"
              data-name="패스 885"
              d="M1034.307,55.374h30.073V35.941h6.324V55.374h29.919V61.08h-17.889a19.366,19.366,0,0,1,6.94,14.8c0,11.415-8.945,20.514-22.209,20.514s-22.208-9.1-22.208-20.514a18.868,18.868,0,0,1,6.94-14.8h-17.891Zm49.042,20.357c0-8.483-6.168-14.8-15.884-14.8s-15.886,6.322-15.886,14.8c0,8.791,6.171,14.806,15.886,14.806s15.884-6.015,15.884-14.806m40.871-47.655L1110.8,20.209l2.468-4.625,17.272,8.944v33.62h22.826v6.015h-22.826v37.013h-6.322Z"
              transform="translate(738.147 11.122)"
              fill="#fff"
            />
            <path
              id="패스_886"
              data-name="패스 886"
              d="M1106.668,55.373h27.76V36.558h6.322V55.373h27.607v5.706h-17.272a18.12,18.12,0,0,1,7.093,14.343c0,10.642-8.637,19.431-20.665,19.431s-20.667-8.789-20.667-19.431a18.436,18.436,0,0,1,6.94-14.343h-17.118Zm45.188,19.9c0-7.557-5.86-13.726-14.343-13.726s-14.342,6.169-14.342,13.726c0,8.172,5.859,13.726,14.342,13.726s14.343-5.554,14.343-13.726M1186.4,35.326l-13.726-7.866,2.467-4.629,17.581,8.947V59.845h21.284V28.076l-13.725-7.864,2.466-4.629,17.582,8.944v76.652h-6.323V65.86h-21.284v35.319H1186.4Z"
              transform="translate(797.789 11.121)"
              fill="#fff"
            />
          </g>
        </g>
        <g id="그룹_197" data-name="그룹 197" transform="translate(0 -30)">
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_21)">
            <circle
              id="타원_21-2"
              data-name="타원 21"
              cx="6"
              cy="6"
              r="6"
              transform="translate(56 41)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_22)">
            <circle
              id="타원_22-2"
              data-name="타원 22"
              cx="6"
              cy="6"
              r="6"
              transform="translate(24 65)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_24)">
            <circle
              id="타원_24-2"
              data-name="타원 24"
              cx="6"
              cy="6"
              r="6"
              transform="translate(86 65)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_25)">
            <circle
              id="타원_25-2"
              data-name="타원 25"
              cx="6"
              cy="6"
              r="6"
              transform="translate(102 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_28)">
            <circle
              id="타원_28-2"
              data-name="타원 28"
              cx="6"
              cy="6"
              r="6"
              transform="translate(183 35)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_29)">
            <circle
              id="타원_29-2"
              data-name="타원 29"
              cx="6"
              cy="6"
              r="6"
              transform="translate(235 74)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_30)">
            <circle
              id="타원_30-2"
              data-name="타원 30"
              cx="6"
              cy="6"
              r="6"
              transform="translate(155 100)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_32)">
            <circle
              id="타원_32-2"
              data-name="타원 32"
              cx="6"
              cy="6"
              r="6"
              transform="translate(182 126)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_33)">
            <circle
              id="타원_33-2"
              data-name="타원 33"
              cx="6"
              cy="6"
              r="6"
              transform="translate(235 182)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_34)">
            <circle
              id="타원_34-2"
              data-name="타원 34"
              cx="6"
              cy="6"
              r="6"
              transform="translate(308 38)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_35)">
            <circle
              id="타원_35-2"
              data-name="타원 35"
              cx="6"
              cy="6"
              r="6"
              transform="translate(279 116)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_36)">
            <circle
              id="타원_36-2"
              data-name="타원 36"
              cx="6"
              cy="6"
              r="6"
              transform="translate(350 116)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_37)">
            <circle
              id="타원_37-2"
              data-name="타원 37"
              cx="6"
              cy="6"
              r="6"
              transform="translate(356 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_39)">
            <circle
              id="타원_39-2"
              data-name="타원 39"
              cx="6"
              cy="6"
              r="6"
              transform="translate(599 47)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_40)">
            <circle
              id="타원_40-2"
              data-name="타원 40"
              cx="6"
              cy="6"
              r="6"
              transform="translate(646 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_41)">
            <circle
              id="타원_41-2"
              data-name="타원 41"
              cx="6"
              cy="6"
              r="6"
              transform="translate(661 106)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_42)">
            <circle
              id="타원_42-2"
              data-name="타원 42"
              cx="6"
              cy="6"
              r="6"
              transform="translate(778 47)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_43)">
            <circle
              id="타원_43-2"
              data-name="타원 43"
              cx="6"
              cy="6"
              r="6"
              transform="translate(780 85)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_44)">
            <circle
              id="타원_44-2"
              data-name="타원 44"
              cx="6"
              cy="6"
              r="6"
              transform="translate(720 112)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_45)">
            <circle
              id="타원_45-2"
              data-name="타원 45"
              cx="6"
              cy="6"
              r="6"
              transform="translate(794 112)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_48)">
            <circle
              id="타원_48-2"
              data-name="타원 48"
              cx="6"
              cy="6"
              r="6"
              transform="translate(765 130)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_49)">
            <circle
              id="타원_49-2"
              data-name="타원 49"
              cx="6"
              cy="6"
              r="6"
              transform="translate(820 163)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_46)">
            <circle
              id="타원_46-2"
              data-name="타원 46"
              cx="6"
              cy="6"
              r="6"
              transform="translate(803 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_50)">
            <circle
              id="타원_50-2"
              data-name="타원 50"
              cx="6"
              cy="6"
              r="6"
              transform="translate(901 47)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_51)">
            <circle
              id="타원_51-2"
              data-name="타원 51"
              cx="6"
              cy="6"
              r="6"
              transform="translate(945 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_52)">
            <circle
              id="타원_52-2"
              data-name="타원 52"
              cx="6"
              cy="6"
              r="6"
              transform="translate(985 69)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_54)">
            <circle
              id="타원_54-2"
              data-name="타원 54"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1020 47)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_55)">
            <circle
              id="타원_55-2"
              data-name="타원 55"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1066 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_56)">
            <circle
              id="타원_56-2"
              data-name="타원 56"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1082 106)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_57)">
            <circle
              id="타원_57-2"
              data-name="타원 57"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1174 37)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_58)">
            <circle
              id="타원_58-2"
              data-name="타원 58"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1174 75)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_59)">
            <circle
              id="타원_59-2"
              data-name="타원 59"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1103 100)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_60)">
            <circle
              id="타원_60-2"
              data-name="타원 60"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1198 100)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_61)">
            <circle
              id="타원_61-2"
              data-name="타원 61"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1125 127)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_62)">
            <circle
              id="타원_62-2"
              data-name="타원 62"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1180 182)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_63)">
            <circle
              id="타원_63-2"
              data-name="타원 63"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1239 45)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_64)">
            <circle
              id="타원_64-2"
              data-name="타원 64"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1282 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_65)">
            <circle
              id="타원_65-2"
              data-name="타원 65"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1299 108)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_66)">
            <circle
              id="타원_66-2"
              data-name="타원 66"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1324 71)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_67)">
            <circle
              id="타원_67-2"
              data-name="타원 67"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1735 24)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_68)">
            <circle
              id="타원_68-2"
              data-name="타원 68"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1707 40)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_69)">
            <circle
              id="타원_69-2"
              data-name="타원 69"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1762 40)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_70)">
            <circle
              id="타원_70-2"
              data-name="타원 70"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1688 100)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_71)">
            <circle
              id="타원_71-2"
              data-name="타원 71"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1784 100)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_72)">
            <circle
              id="타원_72-2"
              data-name="타원 72"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1706 127)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_73)">
            <circle
              id="타원_73-2"
              data-name="타원 73"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1761 162)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_74)">
            <circle
              id="타원_74-2"
              data-name="타원 74"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1828 45)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_75)">
            <circle
              id="타원_75-2"
              data-name="타원 75"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1872 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_76)">
            <circle
              id="타원_76-2"
              data-name="타원 76"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1912 67)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_77)">
            <circle
              id="타원_77-2"
              data-name="타원 77"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1959 45)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_78)">
            <circle
              id="타원_78-2"
              data-name="타원 78"
              cx="6"
              cy="6"
              r="6"
              transform="translate(1995 34)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_79)">
            <circle
              id="타원_79-2"
              data-name="타원 79"
              cx="6"
              cy="6"
              r="6"
              transform="translate(2021 26)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_80)">
            <circle
              id="타원_80-2"
              data-name="타원 80"
              cx="6"
              cy="6"
              r="6"
              transform="translate(2011 106)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_81)">
            <circle
              id="타원_81-2"
              data-name="타원 81"
              cx="6"
              cy="6"
              r="6"
              transform="translate(2038 106)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_53)">
            <circle
              id="타원_53-2"
              data-name="타원 53"
              cx="6"
              cy="6"
              r="6"
              transform="translate(961 106)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_47)">
            <circle
              id="타원_47-2"
              data-name="타원 47"
              cx="6"
              cy="6"
              r="6"
              transform="translate(817 118)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_38)">
            <circle
              id="타원_38-2"
              data-name="타원 38"
              cx="6"
              cy="6"
              r="6"
              transform="translate(370 118)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_31)">
            <circle
              id="타원_31-2"
              data-name="타원 31"
              cx="6"
              cy="6"
              r="6"
              transform="translate(264 100)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_26)">
            <circle
              id="타원_26-2"
              data-name="타원 26"
              cx="6"
              cy="6"
              r="6"
              transform="translate(139 68)"
              fill="#fff"
            />
          </g>
          <g transform="matrix(1, 0, 0, 1, 886, 166)" filter="url(#타원_27)">
            <circle
              id="타원_27-2"
              data-name="타원 27"
              cx="6"
              cy="6"
              r="6"
              transform="translate(116 106)"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  href?: string;
  onFirstClick?: (ref: HTMLElement) => void;
}
export const Card = ({
  birth,
  image,
  title,
  href,
  onFirstClick,
}: CardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const getBirthText = useCallback((birth: Date) => {
    const year = birth.getFullYear();
    const month = birth.getMonth();
    const date = birth.getDate();
    return `${year % 100}.${(month + "").padStart(2, "0")}.${(
      date + ""
    ).padStart(2, "0")}`;
  }, []);
  const birthText = birth instanceof Date ? getBirthText(birth) : birth;
  useCheckClick({
    ref,
    onFirstClick,
  });
  return (
    <CardLink to={href ?? ""} ref={ref}>
      <CardAvatar src={image} />
      <CardContent>
        <CardContentHeader>
          <span>{title}</span>
          <span>{birthText}</span>
        </CardContentHeader>
      </CardContent>
    </CardLink>
  );
};

const CardLink = styled(Link)`
  width: 18.1em;
  aspect-ratio: 25/ 32;
  outline: 1px solid #eeeeee;
  border-radius: 0.7em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.background.secondary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  column-gap: 0.8rem;
  text-decoration: none;
  margin: 0 auto;
  color: ${(props) => props.theme.color.text.main};

  & > div + div {
    border-top: 0.13dvw solid #999999;
  }
`;

const CardAvatar = styled(ImageX)`
  height: 19rem;
  object-fit: fill;
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
  row-gap: 0.5em;
`;

const CardContentHeader = styled(H4)`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 auto;
  color: ${(props) => props.theme.color.text.main};
  > span:first-of-type {
    display: inline-flex;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 0.14em;
      flex: 1;
      background-color: ${(props) => props.theme.color.accent.foreground};

      border-radius: 1rem;
      margin: 0.2rem 0.5rem;
    }
  }
`;

export default { Card, OnBoardTitle };
