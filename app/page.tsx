import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Domains } from "@/components/sections/Domains";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Stats } from "@/components/sections/Stats";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Domains />
      <Ecosystem />
    </main>
  );
}
