import styled from "@emotion/styled";
import { HTMLAttributes, PropsWithChildren } from "react";

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
}
const ImageX = ({ src, ...rest }: PropsWithChildren<ImageProps>) => {
  console.log(rest);
  return (
    <ImageWrapper {...rest}>
      <StyledImage loading="lazy" src={src} />
      {rest.children}
    </ImageWrapper>
  );
};

export default ImageX;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
