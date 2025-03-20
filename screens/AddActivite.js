import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AddActiviteForm from '../components/AddActiviteForm';  // Assurez-vous que ce composant existe et est correctement exporté

const AddActivite = () => {

  const handleFormSubmit = (data) => {
    // Envoyer les données à l'API ou les traiter comme vous le souhaitez
    Alert.alert("Activité ajoutée avec succès !", JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une activité</Text>
      <AddActiviteForm onSubmit={handleFormSubmit} />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#8E8E8E',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: "gold"
  },
});

export default AddActivite;
