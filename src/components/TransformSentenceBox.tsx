import styled from "styled-components";
import { Select, SelectProps } from "./Select";
import { SentenceContainer } from "./SentenceContainer";

interface TransformSentenceBoxProps {
  select: SelectProps;
  loadingSelect?: boolean;
  loading?: boolean;
  value?: string;
}

const ActionButton = styled.button`
  background: var(--primary-color);
  height: 3.125rem;
  border-radius: var(--border-radius-x2);
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.1s;
  font-size: 0.95rem;
  &:active {
    background: var(--primary-color-darker);
  }
`;

export const TransformSentenceBox: React.FC<TransformSentenceBoxProps> = (
  props
) => {
  return (
    <SentenceContainer
      title="Into:"
      titlePadding="0 1rem"
      titleRightComponent={
        <Select {...props.select} loading={props.loadingSelect} />
      }
      value={props.value}
      loading={props.loading}
      disabled
    ></SentenceContainer>
  );
};
