// pages/AddSeanceScreen.js
import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AddSeanceForm from '../components/AddSeanceForm';

const AddSeance = () => {
  const handleFormSubmit = (data) => {
    // Envoyer les données à l'API ou les traiter comme vous le souhaitez
    Alert.alert("Séance ajoutée avec succès !", JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une séance</Text>
      <AddSeanceForm onSubmit={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#8E8E8E',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: "gold"
  },
});

export default AddSeance;
