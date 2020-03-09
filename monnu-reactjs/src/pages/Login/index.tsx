import React, { useContext } from 'react';
import Switch from 'react-switch';
import { shade } from 'polished';

import { Container, FormContainer, AppTitle } from './styles';
import { InputText } from './Input';
import { DarkButton } from '../../components/Button';
import { ThemeContext } from 'styled-components';

interface Props {
  toggleTheme(): void;
}

const Login: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, name } = useContext(ThemeContext);
  return (
    <Container>
      <FormContainer>
        <AppTitle>bem-vindo ao Monnu</AppTitle>
        <InputText placeholder="digite seu usuário" type="text" />
        <InputText placeholder="digite sua senha" type="password" />
        <DarkButton type="submit">sign in</DarkButton>
        <Switch
          onChange={toggleTheme}
          checked={name === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor={shade(0.15, colors.primary)}
          onColor={colors.secondary}
        />
      </FormContainer>
    </Container>
  );
};

export default Login;
