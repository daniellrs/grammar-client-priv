import Skeleton from "react-loading-skeleton";
import ReactSelect, { Props } from "react-select";
import styled from "styled-components";
import { ISelectOption } from "../lib/types";

export interface SelectProps extends Pick<Props, "value" | "options"> {
  options?: ISelectOption[];
  onChange?: (value: ISelectOption) => void;
  loading?: boolean;
  disabled?: boolean;
}

const Container = styled.div`
    width: 100%;
  & > div > div {
      background: var(--tertiary-color);
      border-radius: var(--border-radius-x2);
      color: var(--white-color);
      border: none;
      height: 3.438rem;
      padding-right: 1rem;
      padding-left: 1rem;

      & [class$="indicatorSeparator"] {
        display: none;
      }

      & [class$="singleValue"] {
        color: var(--white-color);
      }
    }
  }

  & > div [class$="menu"] {
    z-index: 500;
    overflow: hidden;
    height: auto;
    padding: 0.8rem 0;
    & [class$="option"] {
        background: inherit;
        cursor: pointer;
        &:hover {
            background: var(--secondary-color);
        }
      }
  }

  & .skeleton {
    border-radius: var(--border-radius-x2) !important;
    height: 3.3rem !important;
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <Container>
      {props.loading ? (
        <Skeleton className="skeleton" />
      ) : (
        <ReactSelect
          value={props.value}
          options={props.options}
          isDisabled={props.disabled}
          onChange={(value) => props.onChange?.(value as ISelectOption)}
        />
      )}
    </Container>
  );
};
