import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DemoSalonIntro"
        component={MyComposition}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
