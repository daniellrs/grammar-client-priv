import styled from "styled-components";
import { BsArrowRight, BsArrowDown } from "react-icons/bs";
import { smallScreenWidth } from "../lib/utils";

interface GoButtonProps {
  onClick?: () => void;
}

const Container = styled.div`
  width: 1.1rem;
  position: relative;
  display: flex;
  justify-content: center;

  @media (max-width: ${smallScreenWidth}px) {
    width: 100%;
    height: 1.1rem;
    align-items: center;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-color);
  border: 0.45rem solid var(--tertiary-color);
  outline: none;
  position: absolute;
  top: 1rem;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: all 0.1s;
  &:active {
    background: var(--primary-color-darker);
  }
  & .arrow-down {
    display: none;
  }
  @media (max-width: ${smallScreenWidth}px) {
    top: unset;
    & .arrow-right {
      display: none;
    }
    & .arrow-down {
      display: unset;
    }
  }
`;

export const GoButton: React.FC<GoButtonProps> = (props) => {
  return (
    <Container>
      <Button onClick={props.onClick}>
        <BsArrowRight className="arrow-right" size={18} />
        <BsArrowDown className="arrow-down" size={18} />
      </Button>
    </Container>
  );
};
