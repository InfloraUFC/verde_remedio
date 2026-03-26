import fs from "fs"
import path from "path"

function generateIndex(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const exports = entries
    .filter((entry) => entry.isDirectory())
    .filter((entry) => {
      const indexPath = path.join(dirPath, entry.name, "index.ts");
      return fs.existsSync(indexPath);
    })
    .map((entry) => `export * from './${entry.name}';`);

  const fileContent = exports.join("\n") + "\n";

  const indexFile = path.join(dirPath, "index.ts");

  fs.writeFileSync(indexFile, fileContent);

  console.log(`index.ts gerado em: ${indexFile}`);
}

const targetDir = process.argv[2];

if (!targetDir) {
  console.error("Passe o caminho da pasta.");
  process.exit(1);
}

generateIndex(path.resolve(targetDir));