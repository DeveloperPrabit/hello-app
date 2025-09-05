import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';
import Modal from 'react-native-modal';

const GITHUB_RELEASE_API =
  'https://api.github.com/repos/DeveloperPrabit/hello-app/releases/latest';

const CURRENT_VERSION = '1.0'; // match your app version

export default function UpdateChecker() {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [apkUrl, setApkUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkUpdate();
  }, []);

  const checkUpdate = async () => {
    try {
      const response = await fetch(GITHUB_RELEASE_API);
      const data = await response.json();

      const tag = data.tag_name; // e.g., "Hello-App"
      const asset = data.assets[0]; // app-release.apk
      const downloadUrl = asset.browser_download_url;

      if (tag !== CURRENT_VERSION) {
        setLatestVersion(tag);
        setApkUrl(downloadUrl);
        setModalVisible(true); // show popup
      }
    } catch (e) {
      console.log('Update check failed:', e);
    }
  };

  const startUpdate = async () => {
    if (!apkUrl) return;

    const downloadDest = `${RNFS.DocumentDirectoryPath}/app-release.apk`;

    const ret = RNFS.downloadFile({
      fromUrl: apkUrl,
      toFile: downloadDest,
    });

    ret.promise
      .then(res => {
        console.log('Downloaded:', res);
        if (Platform.OS === 'android') {
          // Open APK for installation
          Linking.openURL('file://' + downloadDest);
        }
      })
      .catch(err => console.log('Download error:', err));
  };

  return (
    <Modal isVisible={modalVisible}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Update Available!
        </Text>
        <Text>New version: {latestVersion}</Text>
        <Button title="Update Now" onPress={startUpdate} />
        <Button title="Later" onPress={() => setModalVisible(false)} />
      </View>
    </Modal>
  );
}
