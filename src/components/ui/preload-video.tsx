import { HTMLMotionProps, useAnimation } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { fadeInOutVariants } from "@/variants";
interface PreloadVideoProps extends HTMLMotionProps<"video"> {}

const PreloadVideo = (props: PreloadVideoProps) => {
  const controls = useAnimation();
  const { src } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  useLayoutEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.onloadeddata = () => {
        controls.start("animate");
      };
      videoRef.current.onended = (event) => {
        controls.start("exit");
      };
    }
  }, []);
  return (
    <LazyMotion features={domAnimation}>
      <m.video
        variants={fadeInOutVariants}
        initial="initial"
        animate={controls}
        transition={{
          ...props.transition,
          duration: 0.5,
        }}
        ref={videoRef}
        {...props}
      />
    </LazyMotion>
  );
};

export default PreloadVideo;
