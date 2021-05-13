import { FC, ReactElement } from "react";
import Image from "next/image";
import PageStructure from "src/components/PageStructure/PageStructure.component";
import { GetStaticProps } from "next";

interface IImageMap {
  id: number;
  file: string;
}

const imageMap: IImageMap[] = [...new Array(25)].map(
  (image, index: number) => ({
    id: index,
    file: `/images/${index}.jpg`,
  }),
);

const Home: FC = (): ReactElement => (
  <PageStructure>
    {imageMap.map((image: IImageMap) => (
      <Image
        src={image.file}
        height="625"
        width="1000"
        alt={`Sunset & Chill Image ${image.id}`}
        quality={100}
        loading="lazy"
        layout="responsive"
        key={image.id}
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

// eslint-disable-next-line require-await
export const getStaticProps: GetStaticProps = async () => ({
  props: {},
  revalidate: 1,
});

export default Home;
