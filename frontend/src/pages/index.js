import dynamic from "next/dynamic";

const About = dynamic(() => import("../components/about.component"), {
  ssr: false,
});

const HomePage = () => {
  return <About />;
};

export default HomePage;
