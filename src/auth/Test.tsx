// src/auth/Test.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const Dashboard = ({ navigation }: any) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const selectImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage || 'Unknown error');
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri || null);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../assets/default-profile.png')
            // default icon
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to Dashboard!</Text>

      <View style={styles.settings}>
        <Button title="Edit Profile" onPress={() => Alert.alert('Edit Profile', 'Add your profile editing logic')} />
        <Button title="Account Settings" onPress={() => Alert.alert('Settings', 'Add settings logic')} />
        <Button title="Logout" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#f4f4f4',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  settings: {
    width: '80%',
    justifyContent: 'space-between',
    height: 180,
  },
});

export default Dashboard;
