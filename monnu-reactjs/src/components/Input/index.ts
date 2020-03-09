import styled from 'styled-components';

export const InputText = styled.input`
  background: transparent;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #4f4f4f;
  font-size: 16px;
  line-height: 16px;
  height: 40px;
  padding: 10px;
  margin: 10px;
  color: #333;
  :focus {
    border-color: #ddd;
  }
  ::placeholder {
    color: #4f4f4f;
  }
`;
