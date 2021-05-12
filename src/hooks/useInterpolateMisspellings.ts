import { parseMisspelling } from "src/lib/parseMisspelling";

export const useInterpolateMisspelling = () => (text: string | undefined) => parseMisspelling(text);
