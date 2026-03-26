import fs from "fs"
import path from "path"

const componentArg = process.argv[2]

if (!componentArg) {
  console.log("Informe o nome do componente")
  process.exit(1)
}

function toPascalCase(str: string) {
  return str
    .split(/[-_]/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
}

const fileName = componentArg.toLowerCase()
const componentName = toPascalCase(fileName)

const root = process.cwd()

const componentDir = path.resolve(root, "shared", "ui", fileName)
const templatesDir = path.resolve(root, "config", "scripts", "templates")

fs.mkdirSync(componentDir, { recursive: true })

function readTemplate(name: string) {
  const file = path.resolve(templatesDir, name)
  return fs.readFileSync(file, "utf-8")
}

function replace(template: string) {
  return template
    .replace(/{{componentName}}/g, componentName)
    .replace(/{{fileName}}/g, fileName)
}

function createFileIfNotExists(filePath: string, content: string) {
  if (fs.existsSync(filePath)) {
    console.log(`já existe: ${path.basename(filePath)}`)
    return
  }

  fs.writeFileSync(filePath, content)
  console.log(`criado: ${path.basename(filePath)}`)
}

const componentTemplate = readTemplate("component.template.tsx")
const storyTemplate = readTemplate("story.template.ts")
const docsTemplate = readTemplate("docs.template.mdx")

createFileIfNotExists(
  path.join(componentDir, `${fileName}.tsx`),
  replace(componentTemplate)
)

createFileIfNotExists(
  path.join(componentDir, `${fileName}.stories.tsx`),
  replace(storyTemplate)
)

createFileIfNotExists(
  path.join(componentDir, `${fileName}.mdx`),
  replace(docsTemplate)
)

createFileIfNotExists(
  path.join(componentDir, `index.ts`),
  `export * from "./${fileName}"\n`
)

console.log(`\nGeração finalizada para ${componentName}`)