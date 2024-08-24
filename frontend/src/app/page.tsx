import Image from "next/image";
import Generator from "./components/generator";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  md:items-center justify-between p-2 lg:p-24 w-full">

      <Generator></Generator>
      
    </main>
  );
}
