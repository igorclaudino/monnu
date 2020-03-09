import styled from 'styled-components';

export const DarkButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  border: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
