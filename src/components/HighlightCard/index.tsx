import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransition
} from './styles'

interface Props {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighlightCard ({ type, title, amount, lastTransaction } : Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon type={type} name={icon[type]} />
            </Header>

            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransition type={type}>{lastTransaction}</LastTransition>
            </Footer>

        </Container>
    )
}