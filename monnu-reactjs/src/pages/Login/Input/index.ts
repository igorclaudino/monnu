import styled from 'styled-components';

export const InputText = styled.input`
  background: transparent;
  outline: 0;
  border-width: 0 0 2px;
  border-color: ${props => props.theme.colors.background};
  font-size: 16px;
  line-height: 16px;
  height: 40px;
  padding: 10px;
  margin: 10px;
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  :focus {
    border-color: ${props => props.theme.colors.text};
  }
  ::placeholder {
    color: ${props => props.theme.colors.secondary};
  }
`;
