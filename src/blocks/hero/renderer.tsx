import HeroV1 from "./variants/HeroV1";
import HeroV2 from "./variants/HeroV2";
import HeroV3 from "./variants/HeroV3";

interface HeroRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: HeroV1,
  v2: HeroV2,
  v3: HeroV3,
};

export default function HeroRenderer({
  variant,
  content,
}: HeroRendererProps) {
  const Component = variants[variant] || HeroV1;
  return <Component content={content} />;
}