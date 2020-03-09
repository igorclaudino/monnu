import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.primary};
  height: 400px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: space-between;
  padding: 30px 0px;
`;

export const AppTitle = styled.h1`
  font-size: 32px;
  font-style: normal;
  font-weight: normal;
  line-height: 77px;
  color: ${props => props.theme.colors.secondary};
  text-align: center;
`;
