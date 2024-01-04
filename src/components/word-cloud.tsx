import * as THREE from "three";
import {
  createContext,
  useRef,
  useState,
  useMemo,
  useEffect,
  Suspense,
  useContext,
} from "react";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
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
import CameraControls from "camera-controls";

CameraControls.install({ THREE });
type c = {
  select: THREE.Vector3 | null;
  setSelect: (seletc: THREE.Vector3) => void;
} | null;
function Controls({ context }: { context: c }) {
  const pos = new THREE.Vector3();
  const look = new THREE.Vector3();
  const { select, setSelect } = context ?? {};

  const zoom = !!select;
  const focus = select;
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  return useFrame((state, delta) => {
    console.log(look);
    zoom
      ? pos.set(focus?.x ?? 0, focus?.y ?? 0, focus?.z ?? 0 + 0.2)
      : pos.set(0, -10, -30);
    zoom
      ? look.set(
          Math.abs(focus?.x ?? 0),
          Math.abs(focus?.y ?? 0),
          Math.abs(focus?.z ?? 0) - 30
        )
      : look.set(0, 0, -10);
    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );

    return controls.update(delta);
  });
}

function Cloud({ count = 4, radius = 150 }) {
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

const WordCloudContext = createContext<{
  select: THREE.Vector3 | null;
  setSelect: (seletc: THREE.Vector3) => void;
} | null>({
  select: null,
  setSelect: () => {},
});
const WordCloudProvider = () => {
  const [select, setSelect] = useState<THREE.Vector3 | null>(null);
  const handleSelect = (newSelect: THREE.Vector3) => {
    setSelect(select ? null : newSelect);
  };
  return (
    <WordCloudContext.Provider value={{ select, setSelect: handleSelect }}>
      <WordCloud />
    </WordCloudContext.Provider>
  );
};

function WordCloud() {
  const context = useContext(WordCloudContext) ?? {};
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
      <Controls context={context as any} />
    </Canvas>
  );
}

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
  const { select, setSelect } = useContext(WordCloudContext) ?? {};
  const theme = useTheme();
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<typeof Text3D>(null);
  const r = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e: ThreeEvent<PointerEvent> | ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    setHovered(true);
    if (e.type === "click") {
      onClick(text);
      console.log(e.type, text);
      console.log(e.point);
      setSelect && setSelect(e.point);
    }
  };
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
    <Billboard
      {...props}
      ref={r}
      onPointerOver={over}
      onPointerDown={over}
      onPointerEnter={over}
      onPointerUp={out}
      onPointerOut={out}
      onClick={over}
    >
      <Text
        ref={ref}
        characters="abcdefghijklmnopqrstuvwxyz0123456789!"
        font="/assets/fonts/Pretendard-Medium.woff"
        // font={pretendard}

        {...fontProps}
        fontSize={0.6}
        color={theme.color.text.main}
        children={text}
      />
    </Billboard>
  );
}

export default WordCloudProvider;
