import Splashlogo from "@/assets/svgs/splashlogo.svg";
import { StyledText } from "@/components/Styledtext";
import { router } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Easing } from "react-native-reanimated";

const Splash = () => {
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLeave(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View className="flex-1 bg-bluebg items-center justify-center">
      <MotiView
        from={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 0.07, scale: 1.2 }}
        transition={{
          type: "timing",
          duration: 1100,
          delay: 100,
          easing: Easing.out(Easing.cubic),
        }}
        onDidAnimate={(key, finished) => {
          if (key === "opacity" && finished && leave) {
            router.replace("/(main)/Homescreens/Productlisting");
          }
        }}
        className="absolute w-[300px] h-[300px] rounded-full border border-white"
      />

      <MotiView
        from={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{
          type: "timing",
          duration: 1000,
          easing: Easing.out(Easing.cubic),
        }}
        className="absolute w-[220px] h-[220px] rounded-full border border-white"
      />

      {/* Logo */}
      <MotiView
        from={{ opacity: 0, scale: 0.5, translateY: 10 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 800,
          easing: Easing.out(Easing.cubic),
        }}
        className="items-center justify-center mb-5"
      >
        <Splashlogo width={102} height={102} />
      </MotiView>

      {/* Divider */}
      <MotiView
        from={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          type: "timing",
          duration: 600,
          delay: 600,
          easing: Easing.out(Easing.quad),
        }}
        className="w-10 h-px bg-white/40 mb-3"
      />

      {/* Title */}
      <MotiView
        from={{ opacity: 0, translateY: 24 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 700,
          delay: 500,
          easing: Easing.out(Easing.quad),
        }}
        className="items-center mb-small"
      >
        <StyledText
          className="text-white font-bold tracking-widest"
          style={{ fontSize: 22 }}
        >
          Product Vault
        </StyledText>
      </MotiView>

      {/* Tagline */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 0.65, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 700,
          delay: 850,
          easing: Easing.out(Easing.quad),
        }}
        className="items-center "
      >
        <StyledText
          className="text-white  tracking-[5px] font-light mt-28"
          style={{ fontSize: 10 }}
        >
          YOUR DIGITAL SANCTUARY...
        </StyledText>
      </MotiView>
    </View>
  );
};

export default Splash;
