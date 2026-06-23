import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex items-center justify-center bg-ink">
      <div
        className="text-center text-ivory"
        style={{ opacity }}
      >
        <p className="text-sm uppercase tracking-[0.35em] text-champagne">
          Demo
        </p>
        <h1 className="mt-4 text-6xl font-semibold tracking-tight">
          Salon
        </h1>
      </div>
    </AbsoluteFill>
  );
};
