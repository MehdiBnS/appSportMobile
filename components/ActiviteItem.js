import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActiviteItem = ({ item, isActivitesView }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (isActivitesView) {
      // Naviguer à la vue de l'activité
      navigation.navigate('SeanceActivite', { seance: item });
    } else {
      // Naviguer à la vue de la séance
      navigation.navigate('ActiviteSeance', { seance: item });
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      {/* Afficher les informations de l'activité ou de la séance */}
      {isActivitesView ? (
        <>
          <Text style={styles.title}>{item.nom_activite}</Text>
          <Text style={styles.subtitle}>{item.description_activite}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Séance de: {item.activite}</Text>
          <Text style={styles.subtitle}>Durée: {item.duree} minutes</Text>
          <Text style={styles.subtitle}>Date: {item.date_seance}</Text>
          <Text style={styles.subtitle}>Commentaire: {item.commentaire}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default ActiviteItem;
