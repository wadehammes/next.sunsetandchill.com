import { FC } from "react";
import Image from "next/image";
import PageStructure from "src/components/PageStructure/PageStructure.component";

const Home: FC = () => (
  <PageStructure>
    {[...new Array(25)].map((image, index: number) => (
      <Image
        src={`/images/${index}.jpg`}
        height="625"
        width="1000"
        alt=""
        quality={100}
        loading="lazy"
        layout="responsive"
      />
    ))}
  </PageStructure>
);

export default Home;
