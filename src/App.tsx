import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";
import { Footer } from "./components/Footer";
import { History } from "./components/History";
import { GoButton } from "./components/GoButton";
import { SentenceBox } from "./components/SentenceBox";
import { TransformSentenceBox } from "./components/TransformSentenceBox";
import { useHistory } from "./lib/hooks/useHistory";
import { useRandomSentence } from "./lib/hooks/useRandomSentence";
import { useSentenceTypes } from "./lib/hooks/useSentenceTypes";
import { useTransformSentence } from "./lib/hooks/useTransformSentence";
import { IHistory } from "./lib/types";
import { smallScreenWidth } from "./lib/utils";
import { usePrevious } from "./lib/hooks/usePrevious";
import { useCheckGrammar } from "./lib/hooks/useCheckGrammar";

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
  const isFirstSentenceChecked = React.useRef<boolean>(false);

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

  const {
    loading: loadingCheckGrammar,
    grammar,
    checkGrammar,
    setGrammar,
  } = useCheckGrammar();

  const previousSentence = usePrevious(sentence);

  const onSelectHistory = (h: IHistory) => {
    setGrammar(undefined);
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

  const onSentenceBlur = () => {
    if (!sentence || sentence === previousSentence) return;
    checkGrammar(sentence);
  };

  React.useEffect(() => {
    if (sentence === previousSentence || isFirstSentenceChecked.current) return;
    isFirstSentenceChecked.current = true;
    checkGrammar(sentence);
  }, [sentence, previousSentence]);

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
              onBlur={onSentenceBlur}
              loading={loadingSentence}
              loadingCheckGrammar={loadingCheckGrammar}
              grammar={grammar}
            />
            <GoButton
              onClick={() =>
                transformSentence(sentence, selectedSentenceType?.value)
              }
            />
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
