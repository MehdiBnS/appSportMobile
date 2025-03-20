import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditActivite = () => {
  const route = useRoute();
  const { seance } = route.params;
  const navigation = useNavigation();
  
  const [nomActivite, setNomActivite] = useState('');
  const [description_activite, setDescription_activite] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seance) {
      setNomActivite(seance.nom_activite);
      setDescription_activite(seance.description_activite);
    }
  }, [seance]);

  const handleSave = async () => {
    if (!nomActivite || !description_activite) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis !");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(`https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Activite_sport&action=update&id_activite=${seance.id_activite}`, {
        method: 'PUT',  // Changez ici à PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_activite: seance.id_activite,
          nom_activite: nomActivite,
          description_activite: description_activite,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        Alert.alert('Succès', 'L\'activité a été mise à jour avec succès.');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', responseData.error || 'La mise à jour a échoué.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de l\'activité.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier l'activité</Text>
      
      <TextInput
        style={styles.input}
        value={nomActivite}
        onChangeText={setNomActivite}
        placeholder="Nom de l'activité"
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={[styles.input, styles.textarea]}
        value={description_activite}  // Utilisez `description_activite` ici
        onChangeText={setDescription_activite}  // Utilisez `setDescription_activite` ici
        placeholder="Description de l'activité"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
      />
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? (
          <Text style={styles.buttonText}>En cours...</Text>
        ) : (
          <Text style={styles.buttonText}>Enregistrer les modifications</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditActivite;
