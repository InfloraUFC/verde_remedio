// @vitest-environment node
import fs from "fs"
import path from "path"
import { describe, expect, it } from "vitest"
import { getAllRegisteredImagePaths, getCharacterImage, IMAGES } from "./images"

const PUBLIC_DIR = path.resolve(__dirname, "../../public")
const IMAGES_DIR = path.join(PUBLIC_DIR, "images")

function listFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? listFiles(full) : [full]
  })
}

describe("registro global de imagens", () => {
  const registered = getAllRegisteredImagePaths()

  it("todo caminho registrado aponta para um arquivo que existe em /public", () => {
    const missing = registered.filter(
      (p) => !fs.existsSync(path.join(PUBLIC_DIR, p))
    )
    expect(missing).toEqual([])
  })

  it("nenhuma imagem em /public/images ficou sem registro", () => {
    const registeredSet = new Set(registered)
    const orphans = listFiles(IMAGES_DIR)
      .filter((f) => /\.(webp|png|jpe?g|svg)$/i.test(f))
      .map((f) => "/" + path.relative(PUBLIC_DIR, f).split(path.sep).join("/"))
      .filter((p) => !registeredSet.has(p))

    expect(orphans).toEqual([])
  })

  it("nomes de arquivo são seguros para URL (minúsculas, sem acento/espaço)", () => {
    const bad = registered.filter((p) => !/^\/images\/[a-z0-9\-/]+\.(webp|png|jpg|svg)$/.test(p))
    expect(bad).toEqual([])
  })

  it("cobre as 15 plantas e os 5 utensílios do jogo", () => {
    expect(Object.keys(IMAGES.plants)).toHaveLength(15)
    expect(Object.keys(IMAGES.utensils)).toHaveLength(5)
  })

  it("getCharacterImage cai no idle quando a expressão não existe", () => {
    expect(getCharacterImage("luiz", "happy")).toBe(IMAGES.characters.luiz.idle)
    expect(getCharacterImage("luciana", "angry")).toBe(IMAGES.characters.luciana.angry)
  })
})
