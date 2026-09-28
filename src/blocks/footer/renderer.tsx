import FooterV1 from "./variants/FooterV1";
import FooterV2 from "./variants/FooterV2";

interface FooterRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: FooterV1,
  v2: FooterV2,
};

export default function FooterRenderer({
  variant,
  content,
}: FooterRendererProps) {
  const Component = variants[variant] || FooterV1;
  return <Component content={content} />;
}