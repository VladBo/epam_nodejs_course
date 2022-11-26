import * as fs from "node:fs";
import csv from "csvtojson";

const process = async () => {
  try {
    const writeStream = fs.createWriteStream("./data/nodejs-hw1-ex2.txt");
    await csv({
      trim: true,
      delimiter: ";",
    })
      .fromFile("./data/nodejs-hw1-ex1.csv")
      .subscribe((row) => {
        const newObj = {
          book: row.Book,
          author: row.Author,
          price: parseFloat(row.Price.replace(",", ".")),
        };
        writeStream.write(JSON.stringify(newObj) + "\n", "utf8");
      })
      .on("done", () => {
        writeStream.end();
      });
  } catch (error) {
    console.error(error);
  }
};
process();
