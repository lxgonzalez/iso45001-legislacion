import markdownIt from "markdown-it";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

export default function useDownloadCase() {
  const handleDownloadPDF = (markdownContent) => {
    const markdownParser = markdownIt();
    const htmlContent = markdownParser.render(markdownContent);

    const pdfContent = htmlToPdfmake(htmlContent);
    const docDefinition = {
      content: pdfContent,
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return { handleDownloadPDF };
}
