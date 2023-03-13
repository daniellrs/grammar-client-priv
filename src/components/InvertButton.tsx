import styled from "styled-components";
import { BsArrowLeft, BsArrowUp } from "react-icons/bs";
import { smallScreenWidth } from "../lib/utils";

interface InvertButtonProps {
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
  & .arrow-up {
    display: none;
  }
  @media (max-width: ${smallScreenWidth}px) {
    top: unset;
    width: 3.5rem;
    height: 3.5rem;
    & .arrow-left {
      display: none;
    }
    & .arrow-up {
      display: unset;
    }
  }
`;

export const InvertButton: React.FC<InvertButtonProps> = (props) => {
  return (
    <Container>
      <Button onClick={props.onClick}>
        <BsArrowLeft className="arrow-left" size={18} />
        <BsArrowUp className="arrow-up" size={18} />
      </Button>
    </Container>
  );
};
