import Tooltip from "react-native-walkthrough-tooltip";

import { Text } from "react-native";

export const Tip = ({ isVisible, setIsVisible, step, setstep }: any) => {
  return (
    <Tooltip
      isVisible={isVisible}
      content={<Text>Tooltip content</Text>}
      placement="top"
      onClose={() => setIsVisible(false)}
    >
      <Text>Tooltip</Text>
    </Tooltip>
  );
};
