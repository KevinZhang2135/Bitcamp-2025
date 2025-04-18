import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import { useRef, useState } from "react";
import React from "react";

/**
 * Returns the camera app that scans and parses prescription labels
 * @returns A tab with a camera for users to scan prescription labels
 */
export default function CameraTab() {
  // Turns on camera when in tab
    
  // Access cameras on the phone and checks for permissions
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const camera = useRef<CameraView>(null);

  // Captures base64 string from camera and sends it to backend for processing
  const takePhoto = () => {
    camera.current
      ?.takePictureAsync()
      .then(async (photo) => photo && processPhoto(photo));
  };

  const processPhoto = async (photo: CameraCapturedPicture) => {
    const res = await fetch("http://127.0.0.1:5000", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64: photo.base64?.substring(22) }),
    });
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
      <CameraView ref={camera} facing={facing} mirror>
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
    height: 64,
  },
});
