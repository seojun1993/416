import WordCloud from "@/components/word-cloud";
import { useUserStore } from "@/contexts/word-cloud.store";
import styled from "@emotion/styled";

const CloudContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Cloud = () => {
  const { user } = useUserStore();
  return (
    <CloudContainer>
      <WordCloud />
      <ul style={{ flex: 1 }}>
        {user.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </CloudContainer>
  );
};

// {/* <BarChart /> */}
export default Cloud;
