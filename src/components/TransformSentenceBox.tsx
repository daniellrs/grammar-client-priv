import { Select, SelectProps } from "./Select";
import { SentenceContainer } from "./SentenceContainer";

interface TransformSentenceBoxProps {
  select: SelectProps;
  loadingSelect?: boolean;
  loading?: boolean;
  value?: string;
}

export const TransformSentenceBox: React.FC<TransformSentenceBoxProps> = (
  props
) => {
  return (
    <SentenceContainer
      title="Into:"
      titlePadding="0 1rem"
      titleRightComponent={
        <Select
          {...props.select}
          loading={props.loadingSelect}
          disabled={props.loading}
        />
      }
      value={props.value}
      loading={props.loading}
      customClass="transform-sentence"
      disabled
    ></SentenceContainer>
  );
};
