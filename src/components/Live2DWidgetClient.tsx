"use client";
import dynamic from "next/dynamic";
const Live2DWidget = dynamic(() => import("next-live2d").then(mod => mod.Live2DWidget), { ssr: false });

export default function Live2DWidgetClient(props: any) {
  return <Live2DWidget {...props} />;
}