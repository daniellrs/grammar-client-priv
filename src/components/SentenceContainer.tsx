import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { smallScreenWidth } from "../lib/utils";

interface SentenceContainerProps {
  title?: string;
  titlePadding?: string;
  titleRightComponent?: React.ReactNode;
  loading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  customClass?: string;
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  height: 22rem;
  background: var(--secondary-color);
  border-radius: var(--border-radius);

  @media (max-width: ${smallScreenWidth}px) {
    &.sentence {
      padding-bottom: 2.5rem;
    }
    &.transform-sentence {
      padding-top: 2rem;
    }
  }
`;

const TitleContainer = styled.div<{ padding?: string }>`
  padding: ${(props) => props.padding || "1rem"};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.div`
  color: var(--color-grey);
  font-size: 0.875rem;
`;

const TextArea = styled.textarea`
  resize: none;
  flex: 1;
  background: inherit;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const LoadingTextSkeletonContainer = styled.div`
  flex: 1;
  & > span span {
    margin-bottom: 0.15rem;
  }
`;

export const SentenceContainer: React.FC<SentenceContainerProps> = (props) => {
  return (
    <Container className={props.customClass}>
      <TitleContainer padding={props.titlePadding}>
        <Title>{props.title}</Title>
        {props.titleRightComponent}
      </TitleContainer>
      {props.loading ? (
        <LoadingTextSkeletonContainer>
          <Skeleton count={3} />
        </LoadingTextSkeletonContainer>
      ) : (
        <TextArea
          value={props.value}
          disabled={props.disabled}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange?.(e.target.value)}
          onBlur={() => props.onBlur?.()}
        />
      )}
      {props.children}
    </Container>
  );
};
