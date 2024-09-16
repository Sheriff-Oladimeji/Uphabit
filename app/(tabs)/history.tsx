import React from 'react';
import { ScrollView, View } from 'react-native';
import Statistics from '@/components/Statistics';
import Container from '@/components/Container';

const History = () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Statistics />
      </ScrollView>
    </Container>
  );
};

export default History;