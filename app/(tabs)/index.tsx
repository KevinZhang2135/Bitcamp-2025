import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
  // Fetches data when entering the tab
  // const navigation = useNavigation();
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     fetchMedicines();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const [medicines, setMedicines] = useState([]);
  const fetchMedicines = async () => {
    fetch("http://127.0.0.1:5000", {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(console.log);

    // console.log(res.body);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/alpe-di-siusi.png")}
          style={styles.logo}
        ></Image>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Asklepian</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText type="subtitle" style={{marginBottom: 16}}>
          Dashboard
        </ThemedText>

        <ThemedText style={styles.box}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel
          laoreet orci.
        </ThemedText>

        <ThemedText style={styles.box}>
          Morbi hendrerit, leo non suscipit congue, mi neque vulputate est, at
          cursus nunc magna vitae quam. Pellentesque vulputate vel elit id
          dignissim. Praesent laoreet tellus ut accumsan ultrices. Ut vel lorem
          in justo luctus fringilla. Sed varius mi eu lorem vestibulum
          tristique.
        </ThemedText>

        <ThemedText style={styles.box}>
          Curabitur vestibulum vulputate ex, et consectetur sapien porta id.
          Vivamus elementum mollis sapien, ut faucibus eros tincidunt sit amet.
          Aliquam id enim quis leo tempus ultricies. Nunc tristique, dolor non
          imperdiet venenatis, magna orci imperdiet nibh, ut condimentum lorem
          tortor sed lorem.
        </ThemedText>

        <ThemedText style={styles.box}>
          Phasellus non odio sodales, suscipit risus sit amet, suscipit nisl.
          Mauris bibendum volutpat arcu eu dapibus. Proin vehicula lacinia
          rutrum. Pellentesque quis sapien semper, dictum purus sit amet,
          porttitor erat. Donec in viverra felis. Interdum et malesuada fames ac
          ante ipsum primis in faucibus.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  box: {
    marginBottom: 16,
    backgroundColor: "#212121",
    padding: 16,
    borderRadius: 16,
  },
  logo: {
    minWidth: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
