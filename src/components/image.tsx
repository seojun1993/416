import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

const ImageWrapper = styled.div`
  height: 100%;
`;

const StyledImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
}
const ImageX = ({ src, ...rest }: ImageProps) => {
  return (
    <ImageWrapper {...rest}>
      <StyledImage src={src} />
    </ImageWrapper>
  );
};

export default ImageX;
