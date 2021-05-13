import { GetStaticProps } from "next";
import { FC } from "react";

const e404: FC = () => <div>404!</div>;

// eslint-disable-next-line require-await
export const getStaticProps: GetStaticProps = async () => ({
  props: {},
  revalidate: 1,
});

export default e404;
