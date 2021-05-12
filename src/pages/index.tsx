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
        alt={`Sunset & Chill Image ${index}`}
        quality={100}
        loading="lazy"
        layout="responsive"
      />
    ))}
    <p>
      All images via{" "}
      <a
        href="https://www.facebook.com/rob.klug.52"
        target="_blank"
        rel="noreferrer"
      >
        Rob Klug
      </a>{" "}
      unless otherwise watermarked.
    </p>
  </PageStructure>
);

export default Home;
