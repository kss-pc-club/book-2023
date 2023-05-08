module.exports = {
  title: "KSS PC Book 2023", // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
  author: "kss-pc-club", // default to `author` in `package.json` or undefined.
  language: "ja", // default to undefined.
  size: "JIS-B5", // paper size.
  theme: "css/theme_print.css", // .css or local dir or npm package. default to undefined.
  entry: [
    "comments.md", // `title` is automatically guessed from the file (frontmatter > first heading).
    "questionnaire/index.md", // path can be absolute or relative to `entryContext`.
    "covid19-ibaraki/index.md",
    "tech-and-human/index.md",
    "make-game-with-ai/index.md"
    // {
    //   path: 'epigraph.md',
    //   title: 'Epigraph', // title can be overwritten (entry > file),
    //   theme: '@vivliostyle/theme-whatever', // theme can be set individually. default to the root `theme`.
    // },
    // 'glossary.html', // html can be passed.
  ], // `entry` can be `string` or `object` if there's only single markdown file.
  entryContext: "./manuscripts", // default to '.' (relative to `vivliostyle.config.js`).
  output: [
    // path to generate draft file(s). default to '{title}.pdf'
    "./public/book.pdf", // the output format will be inferred from the name.
  ],
  workspaceDir: ".cache", // directory which is saved intermediate files.
  // toc: true, // whether generate and include ToC HTML or not, default to 'false'.
  // cover: './cover.png', // cover image. default to undefined.
  // vfm: { // options of VFM processor
  //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
  //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  // },
};
