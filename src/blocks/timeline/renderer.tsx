import TimelineV1 from "./variants/TimelineV1";
import TimelineV2 from "./variants/TimelineV2";
import TimelineV3 from "./variants/TimelineV3";

interface TimelineRendererProps {
  variant: string;
  content: Record<string, any>;
}

const variants: Record<string, React.ComponentType<any>> = {
  v1: TimelineV1,
  v2: TimelineV2,
  v3: TimelineV3,
};

export default function TimelineRenderer({
  variant,
  content,
}: TimelineRendererProps) {
  const Component = variants[variant] || TimelineV1;
  return <Component content={content} />;
}