import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MetricView } from "./styles";
//import { NoGameText, NoGameView} from "./styles";

interface NoGameProps {
  reputation: number;
  size: number;
}

const Metric: React.FC<NoGameProps> = ({reputation, size}) => {
  let fullStars;
  let starArray = new Array();

  if (reputation === 50) {
    fullStars = [3, 3, 3, 3, 3];
  } else if (reputation < 50 && reputation > 40) {
    fullStars = [3, 3, 3, 3, 2];
  } else if (reputation === 40) {
    fullStars = [3, 3, 3, 3, 1];
  } else if (reputation < 40 && reputation > 30) {
    fullStars = [3, 3, 3, 2, 1];
  } else if (reputation === 30) {
    fullStars = [3, 3, 3, 1, 1];
  } else if (reputation < 30 && reputation > 20) {
    fullStars = [3, 3, 2, 1, 1];
  } else if (reputation === 20) {
    fullStars = [3, 3, 1, 1, 1];
  } else if (reputation < 20 && reputation > 10) {
    fullStars = [3, 2, 1, 1, 1];
  } else if (reputation === 10) {
    fullStars = [3, 1, 1, 1, 1];
  } else if (reputation < 10 && reputation > 0) {
    fullStars = [2, 1, 1, 1, 1];
  } else {
    fullStars = [1, 1, 1, 1, 1];
  }

  for (let star of fullStars) {
    switch (star) {
      case 1:
        starArray.push(<Icon name="star-o" size={size} color="#FAFE50"/>)
        break;
      case 2:
        starArray.push(<Icon name="star-half-full" size={size} color="#FAFE50"/>)
        break;
      case 3:
        starArray.push(<Icon name="star" size={size} color="#FAFE50"/>)
        break;
    }
  }

  return (
    <MetricView>
      {starArray}
    </MetricView>
  );
}

export default Metric;