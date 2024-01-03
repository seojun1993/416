import * as THREE from "three";
import {
  useRef,
  useState,
  useMemo,
  useEffect,
  Suspense,
  PropsWithChildren,
} from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import {
  Billboard,
  BillboardProps,
  Text,
  TrackballControls,
} from "@react-three/drei";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { generate } from "random-words";

function Word({
  children,
  ...props
}: PropsWithChildren<{ position: THREE.Vector3 | string[] } & BillboardProps>) {
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    // "material-toneMapped": false,
  };
  const ref = useRef<Text>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), setHovered(true)
  );
  const out = () => setHovered(false);

  useFrame(({ camera }) => {
    if (ref.current) {
      const material = ref.current as any;
      material.material.color.lerp(
        color.set(hovered ? "#fa2720" : "#111111"),
        0.1
      );
    }
  });
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);
  // Tie component to the render-loop
  return (
    <Billboard {...props} follow lockX>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerDown={over}
        onPointerEnter={over}
        onPointerUp={out}
        onPointerOut={out}
        onClick={() => console.log("clicked")}
        {...fontProps}
        color="#111111"
        children={children}
      />
    </Billboard>
  );
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words: any[] = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          generate(),
        ]);
    return temp;
  }, [count, radius]);
  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

const Layout = m(Canvas);
export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <Layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 35], fov: 90 }}
      >
        {/* <fog attach="fog" args={["white", 0, 10]} /> */}
        <Suspense fallback={null}>
          <group rotation={[10, 10.5, 10]}>
            <Cloud count={8} radius={22} />
          </group>
        </Suspense>
        <TrackballControls />
      </Layout>
    </LazyMotion>
  );
}
