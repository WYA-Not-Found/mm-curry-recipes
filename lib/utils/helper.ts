export const formatRichText = (text: string): string => {
  return text.replaceAll("<p>", "").replaceAll("</p>", "");
};
