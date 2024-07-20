import { fromPath } from "pdf2pic";
import fs from "fs/promises";


/* properties to converted files */
const options = {
    density: 300,
    format: "jpg",
    width: 400,
    height: 162
};

try {

    var sourceFilePath = "sample.pdf";

    // convert pdf pages and retun into buffer
    const resolve = await fromPath(sourceFilePath, options)
    .bulk(-1, { responseType: "buffer" });

    // console.log(resolve);

    // store all the pages from buffer to the defined path
    await Promise.all(resolve.map(async (pageData, index) => {
        const pagePath = `images/page_${pageData.page}.jpg`;

        await fs.writeFile(pagePath, pageData.buffer);

        console.log(`Page ${pageData.page} saved to ${pagePath}`);
    }));
} catch (error) {
    console.log(error);
}