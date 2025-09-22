import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
} from "react-native";
import { Header, HeaderProps, ThemeProps } from "react-native-elements";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import EmailForm from "./form";
// import Header from "@/components/header";
// import { HelloWave } from "@/components/hello-wave";
import { JSX } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const imageUrl = {
  uri: "https://springsmag.com/wp-content/uploads/2016/02/Screen-Shot-2023-04-27-at-3.30.53-PM.png",
};

const AppHeader = (props: any) => {
  return (
    //  <ImageBackground
    //   source={imageUrl}
    //   style={styles.backgroundImage}
    //   >

    <Header
      backgroundColor="#BBDCE5"
      leftComponent={{ icon: "menu", color: "black" }}
      centerComponent={{ text: "Notary Public" }}
      rightComponent={{ icon: "home" }}
      {...props}
    />
  );
};

export default function HomeScreen() {
  return (
    // <ScrollView stickyHeaderIndices={[0]}>
    <>
      {/* <ThemedView style={styles.titleContainer}> */}
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader />
        <ImageBackground
          source={imageUrl}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.page}>
            <ThemedText type="title">Welcome!</ThemedText>
            {/* <EmailForm /> */}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
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
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  page: {
    opacity: 0.85,
    backgroundColor: "#CBDCEB",
    color: "white",
    height: "25%",
    width: "50%",
    padding: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10%",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: "100%",
  },
});
