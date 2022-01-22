import React, { useState, useEffect } from 'react';
import {
	Modal,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from 'react-native';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
	Container,
	Header,
	Title,
	Form,
	Fields,
	TransactionTypes,
} from './styles';

interface FormData {
	name: string;
	amount: string;
}

type NavigationProps = {
	navigate:(screen:string) => void;
}

const schema = Yup.object().shape({
	name: Yup.string().required("Nome e' obrigatorio!"),
	amount: Yup
		.number()
		.typeError("Informe um valor numerico")
		.positive("O valor nao pode ser negativo")
		.required("Valor eh obrigatorio!")
});

export function Register() {
	const [transactionType, setTransactionType] = useState('')
	const [categoryModalOpen, setCategoryModalOpen] = useState(false)

	const dataKey = '@gofinances:transactions';

	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria',
	});

	const navigation = useNavigation<NavigationProps>()

	const {
		control,
		handleSubmit,
		reset,
		formState: {
				errors
		}
	} = useForm({ resolver: yupResolver(schema)});


	function handleTransactionTypeSelect(type: 'positive' | 'negative'){
		setTransactionType(type)
	}

	function handleOpenSelectCategoryModal() {
		setCategoryModalOpen(true);
	}

	function handleCloseSelectCategoryModal() {
		setCategoryModalOpen(false);
	}

	async function handleRegister(form: FormData) {
		if(!transactionType)
			return Alert.alert('Selecione o tipo de transação');

		if(category.key === 'category')
			return Alert.alert('Selecione a categoria');


		const newTransaction = {
			id: String(uuid.v4()),
			name: form.name,
			amount: form.amount,
			type: transactionType,
			category: category.key,
			date: new Date()
		}

		try {
			const data = await AsyncStorage.getItem(dataKey)
			const currentData = data ? JSON.parse(data) : []
			console.log(currentData)

			const dataFormatted = [
					...currentData,
					newTransaction
			]

			await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

			// Resetar campos apos salvar no asyncstorage
			reset()
			setTransactionType('')
			setCategory({
				key: 'category',
				name: 'Categoria',
			})

			navigation.navigate('Listagem');

		} catch (error) {
				console.log(error);
				Alert.alert("Nao foi possivel salvar!")
		}
	}

	useEffect(() => {
		async function loadData(){
				const data = await AsyncStorage.getItem(dataKey);
				console.log(JSON.parse(data!)) // !garante pro typescript que ele sempre vai encontrar o objeto data
		}

		loadData();

		// Remover todos os items do AsyncStorage
		// async function removeAll() {
		//     await AsyncStorage.removeItem(dataKey);
		// }

		// removeAll();
	}, [])

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			{/* TouchableWithout Feedback com onPress keyboard dismiss serve para fechar o teclado quando clicar em qualquer outra parte */}
			<Container>
				<Header>
					<Title>Cadastro</Title>
				</Header>

				<Form>
					<Fields>

						{/* control serve como uma assinatura para o react entender que os dois inputs pertencem ao mesmo formulario */}
						<InputForm
							name="name"
							control={control}
							placeholder="Nome"
							autoCapitalize="sentences"
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							name="amount"
							control={control}
							placeholder="Preço"
							keyboardType="numeric"
							error={errors.amount && errors.amount.message}
						/>


						<TransactionTypes>
							<TransactionTypeButton title="Income" type="up" onPress={() => handleTransactionTypeSelect('positive')} isActive={transactionType === 'positive'} />
							<TransactionTypeButton title="Outcome" type="down" onPress={() => handleTransactionTypeSelect('negative')} isActive={transactionType === 'negative'} />
						</TransactionTypes>

						<CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
					</Fields>

					<Button title="Enviar" onPress={handleSubmit(handleRegister)} />
				</Form>

				<Modal visible={categoryModalOpen}>
					<CategorySelect
							category={category}
							setCategory={setCategory}
							closeSelectCategory={handleCloseSelectCategoryModal}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	)
}