import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";
import { Footer } from "./components/Footer";
import { History } from "./components/History";
import { InvertButton } from "./components/InvertButton";
import { SentenceBox } from "./components/SentenceBox";
import { TransformSentenceBox } from "./components/TransformSentenceBox";
import { useHistory } from "./lib/hooks/useHistory";
import { useRandomSentence } from "./lib/hooks/useRandomSentence";
import { useSentenceTypes } from "./lib/hooks/useSentenceTypes";
import { useTransformSentence } from "./lib/hooks/useTransformSentence";
import { IHistory } from "./lib/types";
import { smallScreenWidth } from "./lib/utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PrimaryContainer = styled.div`
  padding: 1.25rem;
  flex: 1;
`;

const SectionFlex = styled.section`
  display: flex;

  @media (max-width: ${smallScreenWidth}px) {
    flex-direction: column;
    height: calc(100vh - (1.25rem * 2));
  }
`;

function App() {
  const isFirstSentenceTransformed = React.useRef<boolean>(false);
  const { history, saveToHistory, loadHistory } = useHistory();

  const {
    loading: loadingSentenceTypes,
    selected: selectedSentenceType,
    options: optionsSentenceTypes,
    setSelected: setSelectedSentenceType,
    getSentenceTypes,
  } = useSentenceTypes();

  const {
    loading: loadingSentence,
    sentence,
    setSentence,
    getRandomSentence,
  } = useRandomSentence();

  const {
    loading: loadingTransformSentence,
    sentence: transformedSentence,
    setSentence: setTransformedSentence,
    transformSentence,
  } = useTransformSentence({ saveToHistory });

  const transformedSentenceToSentence = () => {
    if (!transformedSentence) return;
    setSentence(transformedSentence);
    setTransformedSentence("");
  };

  const onSelectHistory = (h: IHistory) => {
    setSelectedSentenceType(
      optionsSentenceTypes.find((t) => t.value === h.type)
    );
    setSentence(h.sentence);
    setTransformedSentence(h.transformedSentence);
  };

  const transformFirstSentence = () => {
    if (
      !sentence ||
      !selectedSentenceType ||
      isFirstSentenceTransformed.current
    )
      return;
    isFirstSentenceTransformed.current = true;
    transformSentence(sentence, selectedSentenceType.value);
  };

  React.useEffect(() => {
    getSentenceTypes();
    getRandomSentence();
    loadHistory();
  }, []);

  React.useEffect(() => {
    transformFirstSentence();
  }, [sentence, selectedSentenceType]);

  return (
    <SkeletonTheme
      baseColor="#3e3e49"
      highlightColor="#575768"
      borderRadius="0.8rem"
      height="1.1rem"
    >
      <Container>
        <PrimaryContainer>
          <SectionFlex>
            <SentenceBox
              value={sentence}
              onChange={setSentence}
              loading={loadingSentence}
            />
            <InvertButton onClick={transformedSentenceToSentence} />
            <TransformSentenceBox
              value={transformedSentence}
              loading={loadingTransformSentence}
              loadingSelect={loadingSentenceTypes}
              select={{
                value: selectedSentenceType,
                options: optionsSentenceTypes,
                onChange: (newVal) => {
                  setSelectedSentenceType(newVal);
                  transformSentence(sentence, newVal.value);
                },
              }}
              action={{
                label: "Rewrite it!",
                onClick: () => {
                  transformSentence(sentence, selectedSentenceType?.value);
                },
              }}
            />
          </SectionFlex>
          <History history={history} onSelect={onSelectHistory} />
        </PrimaryContainer>
        <Footer />
      </Container>
    </SkeletonTheme>
  );
}

export default App;
