import React from "react";
import { View, ActivityIndicator } from "react-native";

type LoadingProps = {
  background?: string;
}

const Loading: React.FC<LoadingProps> = ({background}) => {
  return (
    <View style={{
      backgroundColor: background || "#fff",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20
    }}>
      <ActivityIndicator size="large" color="#686868"/>
    </View>
  );
}

export default Loading;