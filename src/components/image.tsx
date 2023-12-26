import styled from "@emotion/styled";

const ImageWrapper = styled.div`
  height: 100%;
`;

const StyledImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

interface ImageProps {
  src: string;
}
const ImageX = ({ src }: ImageProps) => {
  return (
    <ImageWrapper>
      <StyledImage src={src} />
    </ImageWrapper>
  );
};

export default ImageX;
