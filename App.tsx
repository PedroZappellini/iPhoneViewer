import React, {useCallback} from 'react';
import {View, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Page, {page_width} from './src/components/Page';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {pages} from './src/constants';
import Dot from './src/components/Dot';

const App: React.FC = () => {
  const translateX = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / page_width);
  });

  const onIconPress = useCallback(() => {
    if (activeIndex.value + 1 !== pages.length) {
      scrollRef.current?.scrollTo({x: page_width * (activeIndex.value + 1)});
    } else {
      scrollRef.current?.scrollTo({x: 0});
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.title}>
        <Text style={styles.titleText}>iPhone viewer</Text>
      </View>
      <Animated.ScrollView
        ref={scrollRef as any}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        onScroll={scrollHandler}
        style={{flex: 1}}>
        {pages.map((item, index) => (
          <Page
            key={index.toString()}
            title={item.title}
            description={item.description}
            image={item.source}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={[styles.fillCenter, {flexDirection: 'row'}]}>
          {pages.map((item, index) => (
            <Dot
              key={index.toString()}
              index={index}
              activeDotIndex={activeIndex}
            />
          ))}
        </View>
        <View style={styles.fillCenter}>
          <Text style={styles.text}>View Board</Text>
        </View>
        <View style={styles.fillCenter}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  title: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    marginBottom: 30,
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1.7,
    fontWeight: '500',
  },
});
