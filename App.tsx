import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'// No android eh necessario adicionar as bibliotecas do intl

import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components'; // Provider para poder usar o arquivo de theme global

import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {

	// Carregar as fonts a serem utilizadas
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold
	});

	/** Processo pode demorar um pouco, portanto ate que as fontes nao sejam
	 * carregadas, continuar na splash screen
	 */
	if(!fontsLoaded) {
		return <AppLoading />
	}

  	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<StatusBar barStyle="light-content"/>
				<AppRoutes />
			</NavigationContainer>
		</ThemeProvider>
 	);
}
