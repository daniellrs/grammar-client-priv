import { BsClockHistory } from "react-icons/bs";
import styled from "styled-components";
import { IHistory } from "../lib/types";
import { mobileScreenWidth, smallScreenWidth } from "../lib/utils";

interface HistoryProps {
  history?: IHistory[];
  onSelect?: (history: IHistory) => void;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Card = styled.div`
  width: calc((100% / 4) - (0.25rem * 3));
  padding: 1rem;
  background: var(--secondary-color);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  cursor: pointer;

  @media (max-width: ${smallScreenWidth}px) {
    width: calc((100% / 2) - (0.25rem * 2));
  }

  @media (max-width: ${mobileScreenWidth}px) {
    width: 100%;
  }
`;

const Type = styled.div`
  padding: 0.5rem 0.7rem;
  background: var(--color-grey3);
  border-radius: var(--border-radius-d2);
  font-size: 0.65rem;
  align-self: flex-start;
`;

const Sentence = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TransformedSentence = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: var(--color-grey);
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 0 0.1rem 0;
`;

export const History: React.FC<HistoryProps> = (props) => {
  if (!props.history?.length) return null;
  return (
    <section>
      <Title>
        <BsClockHistory /> History
      </Title>
      <Container>
        {props.history.map((h, i) => (
          <Card key={i} onClick={() => props.onSelect?.(h)}>
            <Type>{h.type}</Type>
            <div title={h.sentence}>
              <Sentence>{h.sentence}</Sentence>
            </div>
            <div title={h.transformedSentence}>
              <TransformedSentence>{h.transformedSentence}</TransformedSentence>
            </div>
          </Card>
        ))}
      </Container>
    </section>
  );
};
