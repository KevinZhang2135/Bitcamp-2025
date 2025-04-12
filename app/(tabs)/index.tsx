import { Image, StyleSheet, Platform } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Medicine Bag</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Dashboard</ThemedText>

        <ThemedText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel
          laoreet orci.
        </ThemedText>

        <ThemedText>
          Morbi hendrerit, leo non suscipit congue, mi neque vulputate est, at
          cursus nunc magna vitae quam. Pellentesque vulputate vel elit id
          dignissim. Praesent laoreet tellus ut accumsan ultrices. Ut vel lorem
          in justo luctus fringilla. Sed varius mi eu lorem vestibulum
          tristique.
        </ThemedText>

        <ThemedText>
          Curabitur vestibulum vulputate ex, et consectetur sapien porta id.
          Vivamus elementum mollis sapien, ut faucibus eros tincidunt sit amet.
          Aliquam id enim quis leo tempus ultricies. Nunc tristique, dolor non
          imperdiet venenatis, magna orci imperdiet nibh, ut condimentum lorem
          tortor sed lorem.
        </ThemedText>

        <ThemedText>
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
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  logo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
