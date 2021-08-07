import React from "react";
import { View, ActivityIndicator } from "react-native";

type LoadingProps = {
  styles?: object;
}

const Loading: React.FC<LoadingProps> = ({styles}) => {
  return (
    <View style={[{
      backgroundColor: "#fff",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }, styles]}>
      <ActivityIndicator size="large" color="#686868"/>
    </View>
  );
}

export default Loading;