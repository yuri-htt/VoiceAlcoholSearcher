import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';


/* from app */
// import styles from './styles';

export const HomeTabIcon = ({ tintColor }) => <Ionicon name="md-home" size={26}  color={tintColor} />;
export const PostTabIcon = ({ tintColor }) => <Ionicon name="md-search" size={26}  color={tintColor} />;
export const BadgesTabIcon = ({ tintColor }) => <Ionicon name="md-heart" size={26} color={tintColor} />;

export const TabBar = BottomTabBar;


