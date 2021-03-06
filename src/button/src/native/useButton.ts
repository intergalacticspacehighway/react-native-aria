import type { ReactNode, RefObject } from 'react';
import { PressEvents, usePress } from '../../../interactions/index';
import type { AccessibilityProps, TouchableOpacityProps } from 'react-native';
import { mergeProps } from '@react-aria/utils';

interface ButtonProps extends PressEvents {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** The content to display in the button. */
  children?: ReactNode;
}

export interface RNAriaButtonProps extends AccessibilityProps, ButtonProps {}

export interface ButtonAria {
  /** Props for the button element. */
  buttonProps: TouchableOpacityProps;
  /** Whether the button is currently pressed. */
  isPressed: boolean;
}

export function useButton(
  props: RNAriaButtonProps,
  ref: RefObject<any>
): ButtonAria {
  let {
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    ...rest
  } = props;

  let { pressProps, isPressed } = usePress({
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    isDisabled,
    ref,
  });

  const mergedProps = mergeProps(pressProps, rest, {
    accessibilityState: {
      disabled: isDisabled,
    },
    disabled: isDisabled,
  });

  return {
    isPressed,
    buttonProps: mergedProps,
  };
}
