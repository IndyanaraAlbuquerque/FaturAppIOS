// screens/RecebimentoMercadoriaScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, ScrollView, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialContext } from '../context/MaterialContext';

export default function RecebimentoMercadoriaScreen() {
  const { materiais, registrarRecebimento } = useContext(MaterialContext);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleRecebimento = () => {
    if (produtoSelecionado && quantidade) {
      registrarRecebimento(produtoSelecionado, quantidade);
      Alert.alert('Sucesso', 'Recebimento registrado com sucesso!');
      setProdutoSelecionado('');
      setQuantidade('');
    } else {
      Alert.alert('Erro', 'Por favor, selecione um produto e insira a quantidade.');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Recebimento de Mercadoria</Text>

          <RNPickerSelect
            placeholder={{
              label: 'Selecione um produto...',
              value: null,
              color: '#9EA0A4',
            }}
            items={materiais.map((material) => ({
              label: material.nome,
              value: material.nome,
            }))}
            onValueChange={(value) => setProdutoSelecionado(value)}
            value={produtoSelecionado}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <Button title="Registrar Recebimento" onPress={handleRecebimento} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  overlay: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#D6E4F0',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1977b9',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // para evitar sobreposição do texto com o ícone
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // para evitar sobreposição do texto com o ícone
  },
});
