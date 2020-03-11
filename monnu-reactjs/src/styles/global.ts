import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
    body{
        background-color:#333;
        color: #ddd;
        font-family: 'Roboto', sans-serif;
    }
`;
