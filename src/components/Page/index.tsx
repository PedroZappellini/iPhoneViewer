import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Text,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PageProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  translateX: Animated.SharedValue<number>;
  index: number;
}

const {width: page_width, height: page_height} = Dimensions.get('window');
const circle_width = page_width * 0.9;

const Page: React.FC<PageProps> = ({
  title,
  description,
  image,
  translateX,
  index,
}) => {
  const inputRange = [
    (index - 1) * page_width,
    index * page_width,
    (index + 1) * page_width,
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale: scale}],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      inputRange,
      [1, 0, 1],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity,
      transform: [{rotate: `${rotate * Math.PI}rad`}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={image}
          resizeMode="contain"
          style={[styles.image, rImageStyle]}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: page_width,
    height: page_height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  circleContainer: {
    width: circle_width,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  circle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: circle_width / 2,
  },
  image: {
    height: page_height / 2,
    position: 'absolute',
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 35,
    fontWeight: '700',
    color: '#111',
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: 'grey',
  },
});

export {page_width};

export default Page;
