/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import OnboardCompoents from "@/components/pages/onboard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { getFilteredStudentsByMonthQuery } from "@/queries/student";
import { getImagePath } from "../libs/utils";
import { Prefetch } from "../libs/plugins/prefetch";
import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  motion,
} from "framer-motion";
import { Student } from "@/types/student";
import { H4 } from "@/components/ui/text";
import { Card } from "@/components/common/card";
import { css } from "@emotion/react";
import PreloadVideo from "@/components/ui/preload-video";
import { XMLParser } from "fast-xml-parser";

import vi from "@/assets/videos/sample.webm";
import { useSettingStore } from "@/contexts/setting.store";
import { fadeInOutVariants } from "@/variants";

const Birthday = () => {
  const { data: students } = useQuery(
    getFilteredStudentsByMonthQuery(new Date().getMonth())
  );

  const signActive = useSettingStore((state) => state.signActivate);
  const [id, setId] = useState(() => {
    const id = sessionStorage.getItem("redirect_id");
    if (id) {
      sessionStorage.removeItem("redirect_id");
    }
    return Number(id) ?? 0;
  });

  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: id }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 5000,
      playOnInit: true,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnLastSnap: false,
    }),
    Prefetch({
      onSelect(selectedIndex) {
        setId(selectedIndex);
      },
    }),
  ]);

  const studentOnCenter = useMemo(() => {
    return id !== null && students?.[Number(id)];
  }, [id, students]);

  useEffect(() => {
    if (emblaApi && id) {
      emblaApi.scrollTo(Number(id));
    }
  }, [id]);

  useEffect(() => {
    const getXML = async () => {
      // const data = await require("@/assets/route.xml");
      const parser = new XMLParser({
        parseAttributeValue: true,
        attributeNamePrefix: "",
        textNodeName: "value",
        ignoreAttributes: false,
      });
      const vv = parser.parse(`<?xml version='1.0' encoding='UTF-8'?>
      <KIOSK>
        <HEADER>
          <RET_CODE>SUCC</RET_CODE>
          <VERSION>1.3</VERSION>
        </HEADER>
        <STORE_LIST>
          <STORE_INFO id='11' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='298' pos_y='707' b_code='B0001'></STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[에이 스피릿 오브 
      저니 클럽
      (야외수영장)]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[A Spirit of Journey Club(Outdoor Pool)]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[A Spirit of Journey Club（室外游泳池）]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[エイスピリットオブジャーニークラブ(屋外プール)]]></STORE_NAME_JPN>
            <FONT_SIZE>20</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>20</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2116]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[377]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='10' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1333' pos_y='835' b_code='B0003'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[아난티 키즈 
      컬처클럽]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Ananti Kids 
      Culture Club]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Ananti儿童
      文化俱乐部]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[アナンティキッ
      ズカルチャークラブ]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1346]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[993]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='9' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1997' pos_y='1658' b_code='B0003'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[베케트]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Beckett]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Beckett]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ベケット]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2003]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1474]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='12' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1483' pos_y='557' b_code='B0003'>12F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[에이 스피릿 오브 저니 클럽
      (실내수영장)]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[A Spirit of Journey Club
      (Indoor Pool)]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[A Spirit of Journey Club(（室内游泳池）]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[エイスピリットオブジャーニークラブ(室内プール)]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1433]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[620]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='13' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1973' pos_y='1359' b_code='B0003'>12F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[버지니아]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Virginia]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Virginia]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[バージニア]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1985]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1310]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='14' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1707' pos_y='1332' b_code='B0004'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[루]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Lou]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Lou]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ルー]]></STORE_NAME_JPN>
            <FONT_SIZE>60</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>60</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1707]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1372]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='15' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1893' pos_y='1289' b_code='B0005'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[아쁘앙]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[A Point]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[A Point]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ア・ポワン]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1888]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1208]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='16' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1141' pos_y='1294' b_code='B0005'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[살롱 드 이터널저니]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[SALON DE
      ETERNAL JOURNEY]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[SALON DE
      ETERNAL JOURNEY]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[サロンドエターナルジャーニー]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1124]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1210]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='17' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1513' pos_y='1079' b_code='B0006'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[모비딕 마켓]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Mobydick Market]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Mobydick Market]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[モビーディックマーケット]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1510]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1017]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='19' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2111' pos_y='1514' b_code='B0007'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[정월]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Jungwol]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[晶月]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ジョンウォル]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2116]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1413]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='18' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1490' pos_y='454' b_code='B0007'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[모비딕 마켓 푸드코트]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Mobydick Market]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Mobydick Market]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[モビーディックマーケットフードコート]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1545]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[539]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='20' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1509' pos_y='929' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[스프링팰리스]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Spring Palace]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Spring Palace]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[スプリングパレス]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>60</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1428]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[881]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='32' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2497' pos_y='826' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[조셉앤
      스테이시]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[JOSEPH 
      AND STACEY]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[JOSEPH 
      AND STACEY]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ジョセフアン
      ドステイシー]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2473]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[857]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='33' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2438' pos_y='714' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[세인트제임스
       & 카페]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[SAINT
       JAMES]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[SAINT
       JAMES]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[セントジェー
      ムス&カフェ]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2391]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[733]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='37' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1801' pos_y='283' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[나비타]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[NABITA]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[NABITA]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[NABITA]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1768]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[349]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='36' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1644' pos_y='281' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[바이스트 
      키즈]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[BUYEST 
      KIDS]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[BUYEST 
      KIDS]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[バイストキッズ]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1640]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[353]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='35' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1709' pos_y='526' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[카시나]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[kasina]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[kasina]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[カシナ]]></STORE_NAME_JPN>
            <FONT_SIZE>35</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>35</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1780]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[496]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='30' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2033' pos_y='411' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[코발트]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Cobalt]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Cobalt]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[コバルト]]></STORE_NAME_JPN>
            <FONT_SIZE>45</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1977]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[358]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='90' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2004' pos_y='578' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[에나반트]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[ENAVANT]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[ENAVANT]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[アンナヴァン]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2013]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[527]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='34' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2331' pos_y='530' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[피노크]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[FINORK]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[FINORK]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[FINORK]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2286]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[533]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='88' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2508' pos_y='1072' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[마틴
      골프]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Martine 
      Golf]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Martine 
      Golf]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[マーティ
      ンゴルフ]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2486]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1079]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='87' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2569' pos_y='1175' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[몽슈슈]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[MONCHOUCHOU]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[MONCHOUCHOU]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[モンシュシュ]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2543]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1184]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='31' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2384' pos_y='1179' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[사무엘
      스몰즈]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[samuel 
      smalls]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[samuel 
      smalls]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[サムエルス
      モールズ]]></STORE_NAME_JPN>
            <FONT_SIZE>35</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>35</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2447]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1156]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='29' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2294' pos_y='1032' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[센트 바이 
      아난티]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Scent X 
      ANANTI]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Scent X 
      ANANTI]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[セントバイアナンティ]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2331]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1020]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='28' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2368' pos_y='867' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[살롱 드 
      이터널저니]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Salon de 
      Eternal Journey]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Salon de 
      Eternal Journey]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[サロンドエター
      ナルジャーニー]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2290]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[880]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='95' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1974' pos_y='258' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[로벤스
      로벤틱]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[ROBENCE
      ROMENTIC]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[ROBENCE
      ROMENTIC]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ROBENCE
      ROMENTIC]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1965]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[294]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='96' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2126' pos_y='255' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[아날로그
      타운]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Analog Town]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Analog Town]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[アナログタウン]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2115]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[291]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='21' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2471' pos_y='356' b_code='B0008'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[아난티 
      컬처클럽]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Ananti 
      Culture Club]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[ANANTI
      文化俱乐部]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[アナンティカ
      ルチャークラブ]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2396]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[375]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='24' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2354' pos_y='632' b_code='B0008'>2F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[다자이]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[DAZAI]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[DAZAI]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ダザイ]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>10</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='25' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2380' pos_y='1033' b_code='B0008'>2F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[카포티]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Capote]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Capote]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[カポーティ]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2280]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[847]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='27' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2224' pos_y='911' b_code='B0008'>2F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[트랜드
      앤코]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Trand 
      & Co.]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Trand 
      & Co.]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[トレンド&コー]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2232]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[925]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='26' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2131' pos_y='777' b_code='B0008'>2F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[베이커리]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Bakery]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[面包店]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ベイカリー]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2184]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[789]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='23' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1854' pos_y='702' b_code='B0008'>2F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[르블랑]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Leblanc]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Leblanc]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ルブラン]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2050]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[688]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='91' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2035' pos_y='575' b_code='B0008'>2F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[예쁜책방 
      헤이즐]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[HAZEL]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[HAZEL]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[かわいい本屋ヘイゼル]]></STORE_NAME_JPN>
            <FONT_SIZE>25</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>25</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2091]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[586]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='38' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2224' pos_y='1134' b_code='B0011'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[겐지]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Kenji]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Kenji]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[ケンジ]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2220]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1090]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='39' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2115' pos_y='1135' b_code='B0011'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[코너 
      모비딕]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Corner 
      Mobydick]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Corner 
      Mobydick]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[コーナーモビーディック]]></STORE_NAME_JPN>
            <FONT_SIZE>30</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>30</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[2085]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1104]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='40' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='2102' pos_y='995' b_code='B0011'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[오너스풀(7스퀘어)]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Owners Pool]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Owners Pool]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[オーナーズプール(7スクエア)]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1105]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[963]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='44' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1448' pos_y='1320' b_code='B0011'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[엠스퀘어]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[M. Square]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[M. Square]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[エムスクエア]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1635]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1304]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='43' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='609' pos_y='1254' b_code='B0011'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[수변공원]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Waterside Park (Manor House Village)]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[水边公园（Manor House Village）]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[水辺の公園(メナーハウス村)]]></STORE_NAME_JPN>
            <FONT_SIZE>40</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>40</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[603]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[1145]]></GATE_POS_Y>
          </STORE_INFO>
          <STORE_INFO id='97' dp_type='Y' search_type='Y'>
            <STORE_FLOOR pos_x='1152' pos_y='862' b_code='B0011'>1F</STORE_FLOOR>
            <STORE_NAME_KOR><![CDATA[오너스풀(3스퀘어)]]></STORE_NAME_KOR>
            <STORE_NAME_ENG><![CDATA[Owners Pool]]></STORE_NAME_ENG>
            <STORE_NAME_CHN><![CDATA[Owners Pool]]></STORE_NAME_CHN>
            <STORE_NAME_JPN><![CDATA[Owners Pool]]></STORE_NAME_JPN>
            <FONT_SIZE>45</FONT_SIZE>
            <FONT_COLOR>#000000</FONT_COLOR>
            <LINE_HEIGHT>45</LINE_HEIGHT>
            <GATE_POS_X><![CDATA[1015]]></GATE_POS_X>
            <GATE_POS_Y><![CDATA[922]]></GATE_POS_Y>
          </STORE_INFO>
        </STORE_LIST>
        <PUB_LIST>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__2</PUB_ID>
            <PUB_CODE>P11</PUB_CODE>
            <PUB_FLOOR pos_x='1443' pos_y='590' b_code='B0001' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__3</PUB_ID>
            <PUB_CODE>P12</PUB_CODE>
            <PUB_FLOOR pos_x='1528' pos_y='568' b_code='B0001' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__4</PUB_ID>
            <PUB_CODE>P13</PUB_CODE>
            <PUB_FLOOR pos_x='378' pos_y='373' b_code='B0001' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__5</PUB_ID>
            <PUB_CODE>P12</PUB_CODE>
            <PUB_FLOOR pos_x='710' pos_y='1183' b_code='B0001' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__6</PUB_ID>
            <PUB_CODE>P14</PUB_CODE>
            <PUB_FLOOR pos_x='722' pos_y='971' b_code='B0001' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__7</PUB_ID>
            <PUB_CODE>P17</PUB_CODE>
            <PUB_FLOOR pos_x='1720' pos_y='817' b_code='B0001' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='01_ESC_A' floor=''>
            <PUB_ID>PUB__2</PUB_ID>
            <PUB_CODE>P02</PUB_CODE>
            <PUB_FLOOR pos_x='779' pos_y='255' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='01_ELE_A_B0003' floor=''>
            <PUB_ID>PUB__3</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='646' pos_y='295' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='02_ELE_A_B0004' floor=''>
            <PUB_ID>PUB__4</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1137' pos_y='354' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='04_ELE_A_B0006' floor=''>
            <PUB_ID>PUB__5</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1236' pos_y='1434' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='05_ELE_A_B0007' floor=''>
            <PUB_ID>PUB__6</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='771' pos_y='1610' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='03_ELE_A_B0005' floor=''>
            <PUB_ID>PUB__7</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1891' pos_y='502' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='06_ELE_A_B0008' floor=''>
            <PUB_ID>PUB__8</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2860' pos_y='1087' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__9</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='1332' pos_y='530' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__10</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='2736' pos_y='1368' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor=''>
            <PUB_ID>PUB__11</PUB_ID>
            <PUB_CODE>P18</PUB_CODE>
            <PUB_FLOOR pos_x='1254' pos_y='428' b_code='B0002' ></PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='01_ESC_A' floor='1F,2F,3F,4F,5F,6F,7F,8F,9F,10F,11F,12F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P02</PUB_CODE>
            <PUB_FLOOR pos_x='1951' pos_y='639' b_code='B0003' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_3</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='906' pos_y='874' b_code='B0003' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_4</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='2671' pos_y='1407' b_code='B0003' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='' floor='1F'>
            <PUB_ID>PUB_1F_5</PUB_ID>
            <PUB_CODE>P08</PUB_CODE>
            <PUB_FLOOR pos_x='1260' pos_y='1227' b_code='B0003' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='' floor='1F'>
            <PUB_ID>PUB_1F_6</PUB_ID>
            <PUB_CODE>P10</PUB_CODE>
            <PUB_FLOOR pos_x='2275' pos_y='1013' b_code='B0003' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_7</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2082' pos_y='902' b_code='B0003' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2276' pos_y='883' b_code='B0003' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='3F'>
            <PUB_ID>PUB_3F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2271' pos_y='885' b_code='B0003' >3F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='4F'>
            <PUB_ID>PUB_4F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2270' pos_y='879' b_code='B0003' >4F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='5F'>
            <PUB_ID>PUB_5F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2273' pos_y='882' b_code='B0003' >5F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='6F'>
            <PUB_ID>PUB_6F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2276' pos_y='887' b_code='B0003' >6F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='7F'>
            <PUB_ID>PUB_7F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2274' pos_y='884' b_code='B0003' >7F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='8F'>
            <PUB_ID>PUB_8F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2276' pos_y='886' b_code='B0003' >8F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='9F'>
            <PUB_ID>PUB_9F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2275' pos_y='886' b_code='B0003' >9F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='10F'>
            <PUB_ID>PUB_10F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2279' pos_y='883' b_code='B0003' >10F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='11F'>
            <PUB_ID>PUB_11F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2280' pos_y='882' b_code='B0003' >11F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='01_ELE_A' floor='1F,2F,3F,4F,5F,6F,7F,8F,9F,10F,11F,12F'>
            <PUB_ID>PUB_12F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2281' pos_y='880' b_code='B0003' >12F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='12F'>
            <PUB_ID>PUB_12F_3</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='2017' pos_y='830' b_code='B0003' >12F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='02_ELE_A' floor='1F,2F,3F,4F,5F,6F,7F,8F,9F,10F,11F,12F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1704' pos_y='476' b_code='B0004' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_3</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='1135' pos_y='835' b_code='B0004' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_4</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='2429' pos_y='658' b_code='B0004' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1873' pos_y='848' b_code='B0004' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='3F'>
            <PUB_ID>PUB_3F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1873' pos_y='848' b_code='B0004' >3F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='4F'>
            <PUB_ID>PUB_4F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1873' pos_y='848' b_code='B0004' >4F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='5F'>
            <PUB_ID>PUB_5F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1875' pos_y='846' b_code='B0004' >5F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='6F'>
            <PUB_ID>PUB_6F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1870' pos_y='843' b_code='B0004' >6F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='7F'>
            <PUB_ID>PUB_7F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1873' pos_y='845' b_code='B0004' >7F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='8F'>
            <PUB_ID>PUB_8F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1872' pos_y='848' b_code='B0004' >8F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='9F'>
            <PUB_ID>PUB_9F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1873' pos_y='848' b_code='B0004' >9F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='10F'>
            <PUB_ID>PUB_10F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1872' pos_y='847' b_code='B0004' >10F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='11F'>
            <PUB_ID>PUB_11F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1872' pos_y='845' b_code='B0004' >11F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='12F'>
            <PUB_ID>PUB_12F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1876' pos_y='845' b_code='B0004' >12F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='03_ELE_A' floor='1F,2F,3F,4F,5F,6F,7F,8F,9F,10F,11F,12F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1722' pos_y='636' b_code='B0005' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_3</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='1309' pos_y='868' b_code='B0005' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_4</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='2409' pos_y='851' b_code='B0005' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1900' pos_y='726' b_code='B0005' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='3F'>
            <PUB_ID>PUB_3F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1898' pos_y='724' b_code='B0005' >3F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='4F'>
            <PUB_ID>PUB_4F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1902' pos_y='724' b_code='B0005' >4F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='5F'>
            <PUB_ID>PUB_5F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1903' pos_y='722' b_code='B0005' >5F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='6F'>
            <PUB_ID>PUB_6F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1900' pos_y='724' b_code='B0005' >6F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='7F'>
            <PUB_ID>PUB_7F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1899' pos_y='724' b_code='B0005' >7F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='8F'>
            <PUB_ID>PUB_8F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1902' pos_y='726' b_code='B0005' >8F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='9F'>
            <PUB_ID>PUB_9F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1897' pos_y='726' b_code='B0005' >9F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='10F'>
            <PUB_ID>PUB_10F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1897' pos_y='725' b_code='B0005' >10F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='11F'>
            <PUB_ID>PUB_11F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1897' pos_y='721' b_code='B0005' >11F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='12F'>
            <PUB_ID>PUB_12F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1900' pos_y='729' b_code='B0005' >12F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='4_ELE_A' floor='1F,2F,3F,4F,5F,6F,7F,8F,9F,10F,11F,12F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1687' pos_y='476' b_code='B0006' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_3</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='1045' pos_y='609' b_code='B0006' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1447' pos_y='781' b_code='B0006' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='3F'>
            <PUB_ID>PUB_3F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1445' pos_y='781' b_code='B0006' >3F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='4F'>
            <PUB_ID>PUB_4F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1449' pos_y='783' b_code='B0006' >4F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='5F'>
            <PUB_ID>PUB_5F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1444' pos_y='778' b_code='B0006' >5F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='6F'>
            <PUB_ID>PUB_6F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1446' pos_y='779' b_code='B0006' >6F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='7F'>
            <PUB_ID>PUB_7F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1448' pos_y='779' b_code='B0006' >7F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='8F'>
            <PUB_ID>PUB_8F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1448' pos_y='782' b_code='B0006' >8F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='9F'>
            <PUB_ID>PUB_9F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1444' pos_y='780' b_code='B0006' >9F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='10F'>
            <PUB_ID>PUB_10F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1445' pos_y='779' b_code='B0006' >10F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='11F'>
            <PUB_ID>PUB_11F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1447' pos_y='779' b_code='B0006' >11F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='12F'>
            <PUB_ID>PUB_12F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1446' pos_y='778' b_code='B0006' >12F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='05_ELE_A' floor='1F,2F,3F,4F,5F,6F,7F,8F,9F,10F,11F,12F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2149' pos_y='781' b_code='B0007' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_3</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='2091' pos_y='345' b_code='B0007' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_4</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='1558' pos_y='981' b_code='B0007' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1502' pos_y='765' b_code='B0007' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='3F'>
            <PUB_ID>PUB_3F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1503' pos_y='764' b_code='B0007' >3F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='4F'>
            <PUB_ID>PUB_4F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1502' pos_y='764' b_code='B0007' >4F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='5F'>
            <PUB_ID>PUB_5F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1503' pos_y='765' b_code='B0007' >5F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='6F'>
            <PUB_ID>PUB_6F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1503' pos_y='762' b_code='B0007' >6F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='7F'>
            <PUB_ID>PUB_7F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1501' pos_y='763' b_code='B0007' >7F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='8F'>
            <PUB_ID>PUB_8F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1501' pos_y='764' b_code='B0007' >8F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='9F'>
            <PUB_ID>PUB_9F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1503' pos_y='765' b_code='B0007' >9F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='10F'>
            <PUB_ID>PUB_10F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1503' pos_y='764' b_code='B0007' >10F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='11F'>
            <PUB_ID>PUB_11F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1499' pos_y='766' b_code='B0007' >11F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='12F'>
            <PUB_ID>PUB_12F_2</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1500' pos_y='765' b_code='B0007' >12F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='06_ELE_A' floor='1F,2F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P02</PUB_CODE>
            <PUB_FLOOR pos_x='2189' pos_y='767' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='06_ELE_A' floor='1F,2F'>
            <PUB_ID>PUB_1F_3</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1881' pos_y='145' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_4</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='1197' pos_y='449' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_5</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='2296' pos_y='144' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_6</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='996' pos_y='1401' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='06_ELE_B' floor='1F'>
            <PUB_ID>PUB_1F_7</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='2122' pos_y='577' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_8</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='2538' pos_y='1288' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_9</PUB_ID>
            <PUB_CODE>P15</PUB_CODE>
            <PUB_FLOOR pos_x='997' pos_y='1489' b_code='B0008' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='06_ESC_A' floor='1F,2F'>
            <PUB_ID>PUB_2F_2</PUB_ID>
            <PUB_CODE>P02</PUB_CODE>
            <PUB_FLOOR pos_x='2189' pos_y='1031' b_code='B0008' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='ALL' area='06_ELE_A' floor='1F,2F'>
            <PUB_ID>PUB_2F_3</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='1865' pos_y='400' b_code='B0008' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_4</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='1384' pos_y='683' b_code='B0008' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_5</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='2116' pos_y='399' b_code='B0008' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_6</PUB_ID>
            <PUB_CODE>P16</PUB_CODE>
            <PUB_FLOOR pos_x='1734' pos_y='427' b_code='B0008' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='2F'>
            <PUB_ID>PUB_2F_7</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='1429' pos_y='450' b_code='B0008' >2F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='1762' pos_y='1455' b_code='B0009' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='1512' pos_y='1022' b_code='B0010' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_2</PUB_ID>
            <PUB_CODE>P03</PUB_CODE>
            <PUB_FLOOR pos_x='2268' pos_y='1060' b_code='B0011' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_3</PUB_ID>
            <PUB_CODE>P06</PUB_CODE>
            <PUB_FLOOR pos_x='307' pos_y='851' b_code='B0011' >1F</PUB_FLOOR>
          </PUB_INFO>
          <PUB_INFO sect='' status='' area='' floor='1F'>
            <PUB_ID>PUB_1F_4</PUB_ID>
            <PUB_CODE>P01</PUB_CODE>
            <PUB_FLOOR pos_x='276' pos_y='773' b_code='B0011' >1F</PUB_FLOOR>
          </PUB_INFO>
        </PUB_LIST>
        <NODE_LIST>
          <NODE_INFO floor='' b_code='B0001' x1='483' y1='712' x2='552' y2='729' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='552' y1='729' x2='623' y2='781' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='882' y1='758' x2='799' y2='818' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1711' y1='810' x2='1620' y2='793' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1620' y1='793' x2='1635' y2='681' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1711' y1='810' x2='1679' y2='1017' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1711' y1='810' x2='1824' y2='853' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='2029' y1='893' x2='2143' y2='916' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='2143' y1='916' x2='2397' y2='953' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='2397' y1='953' x2='2593' y2='990' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='2593' y1='990' x2='2716' y2='1013' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='2716' y1='1013' x2='2849' y2='1029' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='2849' y1='1029' x2='2896' y2='1029' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='2896' y1='1029' x2='3067' y2='1026' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='3067' y1='1026' x2='3073' y2='904' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='994' y1='954' x2='1165' y2='933' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='542' y1='926' x2='538' y2='1062' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1824' y1='853' x2='1889' y2='862' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1889' y1='862' x2='2029' y2='893' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='656' y1='861' x2='628' y2='868' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='710' y1='885' x2='656' y2='861' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='710' y1='885' x2='799' y2='818' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1434' y1='592' x2='1488' y2='591' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1522' y1='772' x2='1620' y2='793' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='1522' y1='772' x2='1488' y2='591' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='710' y1='885' x2='799' y2='945' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='708' y1='664' x2='753' y2='635' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='708' y1='664' x2='753' y2='635' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='802' y1='630' x2='860' y2='566' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='802' y1='630' x2='753' y2='635' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='429' y1='769' x2='483' y2='712' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='290' y1='778' x2='429' y2='769' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='799' y1='818' x2='692' y2='802' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='692' y1='802' x2='623' y2='781' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='929' y1='833' x2='882' y2='758' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='882' y1='758' x2='802' y2='630' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='994' y1='954' x2='953' y2='925' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='483' y1='712' x2='425' y2='630' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='692' y1='802' x2='710' y2='885' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='542' y1='926' x2='344' y2='901' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='344' y1='901' x2='290' y2='778' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='515' y1='898' x2='542' y2='926' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='556' y1='860' x2='515' y2='898' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='690' y1='734' x2='665' y2='722' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='690' y1='734' x2='708' y2='664' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='651' y1='693' x2='665' y2='722' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='652' y1='738' x2='665' y2='722' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='603' y1='882' x2='628' y2='868' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='575' y1='899' x2='603' y2='882' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='542' y1='926' x2='575' y2='899' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='597' y1='821' x2='623' y2='781' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='556' y1='860' x2='597' y2='821' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='639' y1='761' x2='652' y2='738' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='623' y1='781' x2='639' y2='761' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='894' y1='951' x2='953' y2='925' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='799' y1='945' x2='894' y2='951' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='687' y1='753' x2='690' y2='734' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='692' y1='802' x2='687' y2='753' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='956' y1='888' x2='953' y2='925' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0001' x1='956' y1='888' x2='929' y2='833' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='849' y1='1631' x2='1012' y2='1614' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1796' y1='531' x2='1663' y2='583' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1680' y1='1163' x2='1671' y2='1326' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1671' y1='1326' x2='1673' y2='1430' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1680' y1='1163' x2='2653' y2='1147' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='2653' y1='1147' x2='2696' y2='1191' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='854' y1='575' x2='767' y2='442' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1006' y1='1479' x2='1012' y2='1614' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='854' y1='575' x2='934' y2='711' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='991' y1='1163' x2='1680' y2='1163' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='934' y1='711' x2='987' y2='791' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='987' y1='791' x2='991' y2='1163' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='991' y1='1163' x2='1006' y2='1479' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1672' y1='687' x2='1663' y2='583' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1680' y1='1163' x2='1671' y2='895' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='' b_code='B0002' x1='1671' y1='895' x2='1672' y2='687' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='1564' y1='1056' x2='1575' y2='601' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='1564' y1='1056' x2='1567' y2='1386' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='1567' y1='1386' x2='2197' y2='1403' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='2197' y1='1403' x2='2611' y2='1401' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='2197' y1='1403' x2='2207' y2='909' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='1337' y1='603' x2='1575' y2='601' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='1334' y1='752' x2='1337' y2='603' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0003' x1='2207' y1='909' x2='2102' y2='906' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='12F' b_code='B0003' x1='2252' y1='956' x2='2073' y2='1058' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='12F' b_code='B0003' x1='2073' y1='1058' x2='1438' y2='624' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='12F' b_code='B0003' x1='2080' y1='1360' x2='2073' y2='1058' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0004' x1='2384' y1='674' x2='1735' y2='663' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0004' x1='1699' y1='489' x2='1735' y2='663' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0005' x1='1732' y1='659' x2='1729' y2='843' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0005' x1='1729' y1='843' x2='1155' y2='850' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0005' x1='1155' y1='850' x2='1117' y2='1216' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0005' x1='1878' y1='1186' x2='1878' y2='843' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0005' x1='1878' y1='843' x2='1729' y2='843' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0005' x1='1878' y1='843' x2='2346' y2='848' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0006' x1='1484' y1='625' x2='1705' y2='625' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0006' x1='1705' y1='625' x2='1702' y2='469' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0006' x1='1484' y1='625' x2='1492' y2='987' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0006' x1='1484' y1='625' x2='1122' y2='630' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0007' x1='2086' y1='1390' x2='2064' y2='976' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0007' x1='2064' y1='976' x2='1534' y2='968' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0007' x1='2064' y1='976' x2='1989' y2='832' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0007' x1='1989' y1='832' x2='1456' y2='514' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0007' x1='2105' y1='782' x2='1989' y2='832' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2470' y1='912' x2='2448' y2='829' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2304' y1='279' x2='2326' y2='335' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2326' y1='335' x2='2301' y2='398' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2301' y1='398' x2='2260' y2='459' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1850' y1='504' x2='1978' y2='510' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2147' y1='304' x2='2248' y2='269' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2248' y1='269' x2='2304' y2='279' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2304' y1='279' x2='2328' y2='199' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1640' y1='399' x2='1459' y2='412' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1459' y1='412' x2='1198' y2='455' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1198' y1='455' x2='1205' y2='869' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1877' y1='141' x2='1917' y2='343' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2047' y1='503' x2='1978' y2='510' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2304' y1='678' x2='2260' y2='459' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1754' y1='381' x2='1917' y2='343' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2233' y1='689' x2='2183' y2='569' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2183' y1='569' x2='2133' y2='531' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2133' y1='531' x2='2047' y2='503' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2265' y1='888' x2='2250' y2='809' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2250' y1='809' x2='2247' y2='736' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2247' y1='736' x2='2233' y2='689' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1850' y1='504' x2='1765' y2='473' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1765' y1='473' x2='1640' y2='399' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1754' y1='381' x2='1640' y2='399' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2491' y1='1195' x2='2472' y2='1148' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2472' y1='1148' x2='2448' y2='1081' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1917' y1='343' x2='1981' y2='335' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1981' y1='335' x2='2042' y2='318' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2042' y1='318' x2='2147' y2='304' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1754' y1='381' x2='1752' y2='429' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='1752' y1='429' x2='1765' y2='473' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2133' y1='531' x2='2260' y2='459' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2265' y1='888' x2='2290' y2='937' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2470' y1='912' x2='2466' y2='967' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2304' y1='678' x2='2381' y2='744' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2381' y1='744' x2='2448' y2='829' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2233' y1='689' x2='2304' y2='678' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2307' y1='991' x2='2290' y2='937' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2448' y1='1081' x2='2473' y2='1035' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2473' y1='1035' x2='2466' y2='967' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2448' y1='1081' x2='2390' y2='1028' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0008' x1='2390' y1='1028' x2='2307' y2='991' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='2186' y1='687' x2='2216' y2='782' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='2216' y1='782' x2='2219' y2='888' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='2219' y1='888' x2='2233' y2='1010' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='2216' y1='782' x2='2504' y2='778' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='2125' y1='617' x2='2186' y2='687' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='2125' y1='617' x2='2124' y2='503' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='2124' y1='503' x2='1865' y2='507' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='1559' y1='507' x2='1865' y2='507' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='1585' y1='427' x2='1559' y2='507' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='2F' b_code='B0008' x1='1484' y1='428' x2='1585' y2='427' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0009' x1='1747' y1='1474' x2='1747' y2='967' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0009' x1='1747' y1='967' x2='1744' y2='733' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0009' x1='1744' y1='733' x2='1374' y2='718' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0009' x1='1747' y1='967' x2='2259' y2='972' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='348' y1='874' x2='613' y2='920' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1100' y1='1017' x2='1239' y2='1039' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1239' y1='1039' x2='1659' y2='1108' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1659' y1='1108' x2='1956' y2='1155' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1956' y1='1155' x2='1972' y2='1072' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='2478' y1='1247' x2='2574' y2='605' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='2478' y1='1247' x2='2497' y2='1596' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='2478' y1='1247' x2='2878' y2='1214' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='579' y1='1110' x2='613' y2='920' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1201' y1='1236' x2='1239' y2='1039' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1972' y1='1072' x2='2156' y2='1095' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='2156' y1='1095' x2='2178' y2='1069' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1956' y1='1155' x2='2478' y2='1247' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1100' y1='1017' x2='1123' y2='894' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1621' y1='1310' x2='1659' y2='1108' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1621' y1='1310' x2='1201' y2='1236' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='1100' y1='1017' x2='887' y2='973' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='887' y1='973' x2='613' y2='920' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='2217' y1='1069' x2='2178' y2='1069' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
          <NODE_INFO floor='1F' b_code='B0011' x1='2215' y1='1092' x2='2217' y2='1069' direction='0' stime0='0000' etime0='2359' stime1='0000' etime1='2359' stime2='0000' etime2='2359' />
        </NODE_LIST>
        <SHAPE_LIST>
          <SHAPE_INFO id='B0001_2' type='TEXT'>
            <SHAPE_FLOOR pos_x='630' pos_y='596' width='73' height='20' angle='52' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[클리퍼A]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_3' type='TEXT'>
            <SHAPE_FLOOR pos_x='913' pos_y='603' width='73' height='20' angle='58' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[클리퍼B]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_4' type='TEXT'>
            <SHAPE_FLOOR pos_x='673' pos_y='999' width='74' height='20' angle='96' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[클리퍼C]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_5' type='TEXT'>
            <SHAPE_FLOOR pos_x='1663' pos_y='606' width='100' height='20' angle='9' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[스프링맨션]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_6' type='TEXT'>
            <SHAPE_FLOOR pos_x='1658' pos_y='1044' width='120' height='20' angle='11' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[풀하우스맨션]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_7' type='TEXT'>
            <SHAPE_FLOOR pos_x='399' pos_y='505' width='120' height='20' angle='88' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[아난티앳부산]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_8' type='TEXT'>
            <SHAPE_FLOOR pos_x='475' pos_y='1125' width='74' height='20' angle='277' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[클리퍼D]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_9' type='TEXT'>
            <SHAPE_FLOOR pos_x='1204' pos_y='914' width='131' height='20' angle='339' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[엘.피.크리스탈]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0001_10' type='TEXT'>
            <SHAPE_FLOOR pos_x='1702' pos_y='820' width='100' height='20' angle='0' b_code='B0001'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='20'><![CDATA[매너하우스]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0002_2' type='TEXT'>
            <SHAPE_FLOOR pos_x='1067' pos_y='377' width='128' height='35' angle='0' b_code='B0002'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='35'><![CDATA[클리퍼A]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0002_3' type='TEXT'>
            <SHAPE_FLOOR pos_x='621' pos_y='168' width='210' height='35' angle='0' b_code='B0002'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='35'><![CDATA[아난티앳부산]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0002_4' type='TEXT'>
            <SHAPE_FLOOR pos_x='1890' pos_y='401' width='128' height='35' angle='0' b_code='B0002'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='35'><![CDATA[클리퍼B]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0002_5' type='TEXT'>
            <SHAPE_FLOOR pos_x='2909' pos_y='983' width='229' height='35' angle='0' b_code='B0002'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='35'><![CDATA[엘.피.크리스탈]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0002_6' type='TEXT'>
            <SHAPE_FLOOR pos_x='1165' pos_y='1310' width='130' height='35' angle='0' b_code='B0002'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='35'><![CDATA[클리퍼C]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
          <SHAPE_INFO id='B0002_7' type='TEXT'>
            <SHAPE_FLOOR pos_x='817' pos_y='1500' width='130' height='35' angle='0' b_code='B0002'></SHAPE_FLOOR>
            <SHAPE_TEXT align='center' font_size='35'><![CDATA[클리퍼D]]></SHAPE_TEXT>
            <LINE_THICK><![CDATA[3]]></LINE_THICK>
            <LINE_COLOR><![CDATA[#000000]]></LINE_COLOR>
          </SHAPE_INFO>
        </SHAPE_LIST>
        <PARK_LIST>
        </PARK_LIST>
      </KIOSK>
      `);
      console.log(vv);
    };
    getXML();
  }, []);
  return (
    <OnBoardShell>
      <LazyMotion features={domAnimation}>
        <Saver>
          <OnBoardMonth>
            <H4>{new Date().getMonth() + 1}월 생일자</H4>
          </OnBoardMonth>
          {studentOnCenter ? (
            <OnboardCompoents.OnBoardTitle title={studentOnCenter.name} />
          ) : null}
          {students ? (
            <EmblaCarousel
              cssSlide={css`
                width: 60dvw;
                flex-grow: 1;
                display: flex;
                align-items: center;
              `}
              carouselType={[emblaRef, emblaApi]}
              slides={students}
            >
              {(item, index) => {
                return (
                  <OnBoardItem
                    key={item.id}
                    item={item}
                    index={index}
                    onFirstClick={() => {
                      emblaApi?.scrollTo(index);
                    }}
                    onDoubleClick={() => {
                      sessionStorage.setItem("redirect_id", id + "");
                    }}
                  />
                );
              }}
            </EmblaCarousel>
          ) : null}
        </Saver>
        <AnimatePresence mode="wait">
          {signActive ? (
            <PreloadVideo key="video" src={vi} autoPlay muted></PreloadVideo>
          ) : (
            <Birth key="none" />
          )}
        </AnimatePresence>
      </LazyMotion>
    </OnBoardShell>
  );
};

function Birth() {
  return (
    <motion.div
      variants={fadeInOutVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 36rem;
      `}
    >
      <div
        css={css`
          user-select: none;
          pointer-events: none;
          object-fit: cover;
          width: 100%;
          height: 70%;
        `}
      >
        dfdfdf
      </div>
    </motion.div>
  );
}

export default Birthday;

function OnBoardItem({
  item,
  onFirstClick,
  onDoubleClick,
  onBlur,
}: {
  item: Student;
  index: number;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
}) {
  return (
    <Card
      badge={item.title_keyword}
      classDescription={item.class_number}
      onFirstClick={onFirstClick}
      onDoubleClick={onDoubleClick}
      onBlur={onBlur}
      href={`board?id=${item["416_id"]}`}
      image={getImagePath(item.caricature)}
      birth={item.birthday}
      title={item.name}
    />
  );
}

const OnBoardMonth = styled.div`
  border-color: ${(props) => props.theme.color.accent.foreground};
  border-width: 0.17em;
  border-radius: 9999rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.95em;
  height: 3.2em;
  border-style: solid;
  margin-bottom: 0.6em;
  background-color: ${(props) => props.theme.color.background.card};
`;
const OnBoardShell = styled(MainShell)`
  justify-content: space-between;
  overflow: clip;
`;

const Saver = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100dvw;
  flex: 1 1 100%;
`;
