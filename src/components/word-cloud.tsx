import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import {
  Billboard,
  BillboardProps,
  OrbitControls,
  Text,
  Text3D,
} from "@react-three/drei";
import DREAM_JSON from "@/assets/dream.json";
import { useUserStore } from "@/contexts/word-cloud.store";
import { useTheme } from "@emotion/react";
import pretendard from "@/assets/pretendard.json";

function Word({
  children,
  text,
  onClick,
  ...props
}: {
  text: string;
  position: THREE.Vector3 | string[];
  onClick: (dream: string) => void;
} & BillboardProps) {
  const theme = useTheme();
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<typeof Text3D>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), setHovered(true)
  );
  const out = () => setHovered(false);

  useFrame(({ camera, get }) => {
    if (ref.current) {
      const material = ref.current as any;
      material.material.color.lerp(
        color.set(hovered ? "#fa2720" : theme.color.text.main),
        0.1
      );
    }
  });

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
      // if (ref.current) {
      //   const material = ref.current as any;
      //   material.material.color.lerp(
      //     color.set(hovered ? "#fa2720" : theme.color.text.main),
      //     0.1
      //   );
      // }
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <Billboard {...props} follow>
      <Text
        ref={ref}
        characters="abcdefghijklmnopqrstuvwxyz0123456789!"
        font="/assets/fonts/Pretendard-Medium.woff"
        // font={pretendard}
        onPointerOver={over}
        onPointerDown={over}
        onPointerEnter={over}
        onPointerUp={out}
        onPointerOut={out}
        onClick={() => hovered && onClick(text)}
        {...fontProps}
        fontSize={0.6}
        color={theme.color.text.main}
        children={text}
      />
    </Billboard>
  );
}

function Cloud({ count = 4, radius = 150 }) {
  // Create a count x count random words with spherical distribution
  const { setUser } = useUserStore();
  const words = useMemo(() => {
    const dreams = Object.keys(DREAM_JSON);
    const countDream = dreams.length;
    const temp = [];
    const spherical = new THREE.Spherical();
    for (let i = 1; i < countDream; i++) {
      // const phiSpan = Math.PI / (countDream );
      // const thetaSpan = (Math.PI * 2) / countDream;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / countDream);
      const theta = Math.sqrt(countDream * Math.PI) * phi;
      const vec: [THREE.Vector3, string] = [
        new THREE.Vector3().setFromSpherical(spherical.set(radius, phi, theta)),
        dreams[i],
      ];
      temp.push(vec);
    }
    return temp;
  }, [count, radius]);
  return words.map(([pos, word], index) => (
    <Word
      key={index}
      position={pos}
      text={word}
      onClick={(dream) => {
        setUser(DREAM_JSON[dream as keyof typeof DREAM_JSON]);
      }}
    />
  ));
}

export default function WordCloud() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 35], fov: 90 }}
      style={{ flex: 10 }}
    >
      <fog attach="fog" args={["#c9c9c9", 0, 70]} />
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          <Cloud count={8} radius={22} />
        </group>
      </Suspense>
      {/* <TrackballControls /> */}
      <OrbitControls
        makeDefault
        maxZoom={2}
        minZoom={0.5}
        minDistance={1.2}
        maxDistance={50}
        // enablePan={false}
      />
    </Canvas>
  );
}
