module.exports = {
  title: "KSS PC Book 2023",
  author: "kss-pc-club",
  language: "ja",
  size: "JIS-B5",
  theme: "css/theme_print.css",
  entry: [
    "index.md",
    "foreword.md",
    "questionnaire/index.md",
    "covid19-ibaraki/index.md",
    "tsukuba-ac/index.md",
    "cashless-payment/index.md",
    "Synthesizer/index.md",
    "hrkn63_hnm/index.md",
    "eno1220/index.md",
    "tech-and-human/index.md",
    "make-game-with-ai/index.md",
    "font-generation/index.md",
    "comments.md",
    "colophon.md",
  ],
  entryContext: "./manuscripts",
  output: ["./public/book.pdf"],
  workspaceDir: ".cache",
  // toc: true, // whether generate and include ToC HTML or not, default to 'false'.
  // cover: './cover.png', // cover image. default to undefined.
  // vfm: { // options of VFM processor
  //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
  //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  // },
};
