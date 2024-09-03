import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = {
  name: any; 
  size?: number;
  color?: string;
  [key: string]: any;
};

type TabBarIconProps<T extends React.ComponentType<any>> = {
  IconComponent: any;
  name: React.ComponentProps<T>['name']; 
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function TabBarIcon<T extends React.ComponentType<any>>({
  IconComponent,
  name,
  color,
  size = 22,
  style,
  ...rest
}: TabBarIconProps<T>) {
  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}
