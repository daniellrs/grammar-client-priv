import React from "react";
import styled from "styled-components";
import { useCheckGrammar } from "../lib/hooks/useCheckGrammar";
import { usePrevious } from "../lib/hooks/usePrevious";
import { SentenceContainer } from "./SentenceContainer";

interface SentenceBoxProps {
  loading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const GrammarContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
  border-top: 1px solid var(--color-grey2);
`;

const GrammarDot = styled.div<{ correct?: boolean; isLoading?: boolean }>`
  min-width: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${(props) => {
    if (!props.isLoading && typeof props.correct === "boolean") {
      return props.correct ? "var(--green-color)" : "var(--red-color)";
    }
    return "var(--color-grey)";
  }};
`;

const GrammarText = styled.span`
  font-size: 0.875rem;
  color: var(--color-grey);
`;

const GrammarLoadingDotContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  padding-top: 0.7rem;
`;

const GrammarLoadingDot = styled.div<{ delay?: number }>`
  min-width: 0.1rem;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background: var(--color-grey);
  animation: blink 2s linear infinite;
  animation-delay: ${(props) => props.delay || 0}s;
  @keyframes blink {
    0% {
      opacity: 0.1;
    }
    25% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export const SentenceBox: React.FC<SentenceBoxProps> = (props) => {
  const isFirstSentenceChecked = React.useRef<boolean>(false);

  const previousValue = usePrevious(props.value);
  const {
    loading: loadingCheckGrammar,
    grammar,
    checkGrammar,
  } = useCheckGrammar();

  const onBlur = () => {
    if (!props.value || props.value === previousValue) return;
    checkGrammar(props.value);
  };

  React.useEffect(() => {
    if (props.value === previousValue || isFirstSentenceChecked.current) return;
    checkGrammar(props.value);
    isFirstSentenceChecked.current = true;
  }, [props.value, previousValue]);

  return (
    <SentenceContainer
      title="Your sentence"
      placeholder="Write a sentence..."
      value={props.value}
      onChange={props.onChange}
      loading={props.loading}
      onBlur={onBlur}
    >
      <GrammarContainer>
        <GrammarDot
          correct={grammar?.correct}
          isLoading={loadingCheckGrammar}
        />
        {loadingCheckGrammar ? (
          <GrammarLoadingDotContainer>
            <GrammarLoadingDot />
            <GrammarLoadingDot delay={0.4} />
            <GrammarLoadingDot delay={0.8} />
          </GrammarLoadingDotContainer>
        ) : (
          <GrammarText>
            {grammar?.correct
              ? "Your sentence is gramatically correct"
              : grammar?.errors}
          </GrammarText>
        )}
      </GrammarContainer>
    </SentenceContainer>
  );
};
