import { FC, memo } from "react";
import Lottie from "react-lottie-player";
import { Entry } from "src/interfaces/common.interfaces";
import { LottieRendererTypes } from "src/components/LottieFile/LottieFile.interfaces";

interface LottieFileProps {
  data?: Entry | null;
  path?: string | null;
  play?: boolean;
  height?: number;
  width?: number;
  renderer?: LottieRendererTypes;
  onLoopComplete?: () => void;
}

export const LottieFile: FC<LottieFileProps> = memo(
  ({
    data = null,
    play = true,
    height = 540,
    width = 1440,
    path = null,
    renderer = LottieRendererTypes.Canvas,
    onLoopComplete = () => true,
  }) => (
      <Lottie
        loop
        play={play}
        animationData={data}
        path={path}
        renderer={renderer}
        onLoopComplete={onLoopComplete}
        style={{ height: `${height / 16}em`, width: `${width / 16}em` }}
      />
    ),
);

export default LottieFile;
