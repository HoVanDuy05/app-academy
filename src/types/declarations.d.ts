// Type declarations for third-party modules

declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Icon } from 'react-native-vector-icons';
  export default Icon;
}

declare module '@react-native-community/slider' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';
  
  interface SliderProps {
    value?: number;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    onValueChange?: (value: number) => void;
    onSlidingStart?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
    disabled?: boolean;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;
    style?: ViewStyle;
    testID?: string;
  }
  
  export default class Slider extends Component<SliderProps> {}
}
