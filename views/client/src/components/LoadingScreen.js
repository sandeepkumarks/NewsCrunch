import React from 'react';
import { View } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
const Wait = () => {
  return (
    <Container>
      <Content contentContainerStyle={{flex:1}}>
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color='black' />
        </View>
      </Content>
    </Container>
  );
}
export default Wait;
