import { AiFillLinkedin } from "react-icons/ai";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  padding: 0.5rem 1rem 1rem 1rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Link = styled.a`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.825rem;
  cursor: pointer;
  color: var(--color-grey);
  text-decoration: none;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Link href="https://www.linkedin.com/in/daniellrs/" target="_blank">
        Made by Daniel Schneider <AiFillLinkedin size={20} />
      </Link>
    </FooterContainer>
  );
};
