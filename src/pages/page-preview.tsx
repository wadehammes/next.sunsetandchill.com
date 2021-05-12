import { getPageById } from "src/client/index";
import {
  GetPageProps,
  makeGetStaticProps,
  PreviewPageComponent,
} from "src/utils/pageHelpers";
import { CONSTANTS as constant } from "src/utils/constants";

type PreviewDataType = {
  id: string | number;
};

const getPageProps: GetPageProps = async ({ previewData, preview = false }) => {
  const previewDataObject: PreviewDataType = previewData as PreviewDataType;

  const page =
    preview && previewDataObject?.id
      ? await getPageById({
          id: previewDataObject.id,
          preview,
        })
      : await getPageById({
          id: constant.RH_PREVIEW_LOADING_PAGE_ID,
          preview,
        });

  return {
    page,
  };
};

export const getStaticProps = makeGetStaticProps(getPageProps);

// eslint-disable-next-line import/no-default-export
export default PreviewPageComponent;
