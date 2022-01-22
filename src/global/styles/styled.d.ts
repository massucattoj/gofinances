/** Sobscrever os tipos defaults do TS */

import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    type ThemeType = typeof theme

    // Alterar o defaultTheme do styled components com os estilos globais criados (ajuda na produtividade)
    export interface DefaultTheme extends ThemeType
}