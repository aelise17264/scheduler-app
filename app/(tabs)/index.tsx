// import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Image,
} from "react-native";
import { Header, HeaderProps, ThemeProps } from "react-native-elements";
import { ThemedText } from "@/components/themed-text";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
      <SafeAreaProvider style={{ flex: 1 }}>
        <AppHeader />
        <ImageBackground
          source={imageUrl}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.reactLogo}>
            <Image
              source={{
                uri: "https://m.media-amazon.com/images/I/61945714q6L._UF894,1000_QL80_.jpg",
              }}
              style={{ height: 100, width: 100 }}
            />
          </View>
          <View style={styles.page}>
            <ThemedText type="title">Welcome!</ThemedText>

            {/* <EmailForm /> */}
          </View>
        </ImageBackground>
      </SafeAreaProvider>
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
    top: 20,
    left: 20,
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
