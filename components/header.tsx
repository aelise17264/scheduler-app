import React, { JSX } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import { tailwind } from "tailwind";

type PageHeaderProps = {
  leftNode?: JSX.Element;
  rightNode?: JSX.Element;
  headerText?: string;
  handleOnPressLeftNode?: (event: GestureResponderEvent) => void;
  handleOnPressRightNode?: (event: GestureResponderEvent) => void;
  rightContainerStyle?: ViewProps["style"] | null;
  leftContainerStyle?: ViewProps["style"] | null;
};

const Header: React.FC<PageHeaderProps> = ({
  leftNode = null,
  rightNode = null,
  headerText = "",
  handleOnPressLeftNode = null,
  handleOnPressRightNode = null,
  rightContainerStyle = null,
  leftContainerStyle = null,
}) => {
  return (
    <View style={styles.pageHeaderContainer}>
      <Pressable
        onPress={handleOnPressLeftNode}
        style={leftContainerStyle || styles.leftItem}
      >
        {leftNode}
      </Pressable>
      <View style={styles.headerItem}>
        <Text style={[tailwind("text-center")]}>{headerText}</Text>
      </View>
      <Pressable
        onPress={handleOnPressRightNode}
        style={rightContainerStyle || styles.rightItem}
      >
        {rightNode}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pageHeaderContainer: tailwind(
    "flex flex-row items-center justify-between border-b border-gray-200",
  ),
  leftItem: tailwind("flex-1 pl-4 py-4"),
  rightItem: tailwind("flex-1 pr-4 items-end py-4"),
  headerItem: tailwind("flex-1 py-4"),
});

export default Header;
