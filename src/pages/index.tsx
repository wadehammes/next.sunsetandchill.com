import { FC } from "react";
import Image from "next/image";
import PageStructure from "src/components/PageStructure/PageStructure.component";

const Home: FC = () => (
  <PageStructure>
    {[...new Array(25)].map((image, index: number) => (
      <Image src={`/images/${index}.jpeg`} height="1080" width="1920" alt="" />
    ))}
  </PageStructure>
);

export default Home;
