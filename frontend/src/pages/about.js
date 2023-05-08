import dynamic from "next/dynamic";

const About = dynamic(() => import("../components/about.component"), {
  ssr: false,
});

export default function AboutPage() {
  return <About />;
}
