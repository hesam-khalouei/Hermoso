import HeaderV1 from "./variants/HeaderV1";
import HeaderV2 from "./variants/HeaderV2";

interface HeaderRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: HeaderV1,
  v2: HeaderV2,
};

export default function HeaderRenderer({
  variant,
  content,
}: HeaderRendererProps) {
  const Component = variants[variant] || HeaderV1;
  return <Component content={content} />;
}