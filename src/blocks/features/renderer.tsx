import FeaturesV1 from "./variants/FeaturesV1";
import FeaturesV2 from "./variants/FeaturesV2";

interface FeaturesRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: FeaturesV1,
  v2: FeaturesV2,
};

export default function FeaturesRenderer({
  variant,
  content,
}: FeaturesRendererProps) {
  const Component = variants[variant] || FeaturesV1;
  return <Component content={content} />;
}