import React from 'react';
import { FlatList } from 'react-native';

import { categories } from '../../utils/categories';

import { Button } from '../../components/Form/Button';

import {
    Container,
    Header,
    HeaderTitle,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
    ButtonText,
} from './styles'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({category, setCategory, closeSelectCategory} : Props) {

    function handleCategorySelect(item : Category) {
        setCategory(item);
    }
    return (
        <Container>
            <Header>
                <HeaderTitle>Categoria</HeaderTitle>
            </Header>

            <FlatList
                data={categories}
                style={{flex: 1, width: '100%'}}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category onPress={() => handleCategorySelect(item)} isActive={category.key === item.key}>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecionar" onPress={closeSelectCategory} />
            </Footer>

        </Container>
    )
}