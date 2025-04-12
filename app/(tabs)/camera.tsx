import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

import { useRef, useState } from "react";
import React from "react";

/**
 * Returns the camera app that scans and parses prescription labels
 * @returns A tab with a camera for users to scan prescription labels
 */
export default function CameraTab() {
  // Access cameras on the phone and checks for permissions
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const camera = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState("");

  const takePhoto = () => {
    camera.current?.takePictureAsync().then((photo) => photo && setPhotoUri(photo.uri));
  };

  // Camera permissions are still loading
  if (!permission) return <View />;

  // Requests for camera permissions if not granted yet
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );

  return (
    <View style={styles.container}>
      <CameraView ref={camera} facing={facing}>
        <TouchableOpacity>
          <svg style={styles.photoButton} onClick={takePhoto}>
            <circle cx="32" cy="32" r="32" fill="white" />
          </svg>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  photoButton: {
    position: "fixed",
    bottom: 128,
    right: "calc(50% - 32px)",
    width: 64,
    height: 64
  }
});
