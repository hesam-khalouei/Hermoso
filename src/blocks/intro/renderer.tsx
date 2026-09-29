import IntroV1 from "./variants/IntroV1";
import IntroV2 from "./variants/IntroV2";

interface IntroRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: IntroV1,
  v2: IntroV2,
};

export default function IntroRenderer({
  variant,
  content,
}: IntroRendererProps) {
  const Component = variants[variant] || IntroV1;
  return <Component content={content} />;
}