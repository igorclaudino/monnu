import 'styled-componets';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;

    colors: {
      primary: string;
      secondary: string;

      background: string;
      text: string;
    };
  }
}
