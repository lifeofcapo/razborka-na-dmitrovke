import fs from "fs";

const data = fs.readFileSync("запчасти.txt", "utf8");

const lines = data.split("\n").filter((line) => line.trim());

const parts = lines
  .map((line) => {
    const dataValueMatch = line.match(/data-value="([^"]+)"/);
    const nameMatch = line.match(/">([^<]+)</);

    if (!dataValueMatch || !nameMatch) return null;

    const slug = dataValueMatch[1];
    const name = nameMatch[1].trim();

    return { slug, name };
  })
  .filter(Boolean);

const output = JSON.stringify(parts, null, 2);
fs.writeFileSync("output.json", output, "utf8");

console.log("Результат записан в файл output.js");
