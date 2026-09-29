import AboutV1 from "./variants/AboutV1";
import AboutV2 from "./variants/AboutV2";

interface AboutRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: AboutV1,
  v2: AboutV2,
};

export default function AboutRenderer({
  variant,
  content,
}: AboutRendererProps) {
  const Component = variants[variant] || AboutV1;
  return <Component content={content} />;
}