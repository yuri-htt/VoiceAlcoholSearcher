import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

/* from app */
import styles from './styles';

export const HomeTabIcon = ({ tintColor }) => <Ionicon name="md-home" size={22} style={styles.icon} color={tintColor} />;
export const PostTabIcon = ({ tintColor }) => (
  <View style={[styles.takeTab]}>
    <View style={[styles.takeTabRounded, { borderColor: tintColor }]}>
      <Ionicon name="md-add" size={22} style={styles.takeTabIcon} color={tintColor} />
    </View>
  </View>
);
export const BadgesTabIcon = ({ tintColor }) => <SimpleLineIcons name="badge" size={22} style={styles.icon} color={tintColor} />;

export const TabBar = BottomTabBar;


