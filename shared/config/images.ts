/**
 * REGISTRO GLOBAL DE IMAGENS
 * ---------------------------------------------------------------------------
 * Este é o ÚNICO lugar do projeto que conhece caminhos de imagem.
 * Nenhum componente/entidade deve escrever "/images/..." na mão: importe
 * daqui (`IMAGES`, `getIngredientImage`, `getUtensilImage`, ...).
 *
 * Como adicionar/trocar uma imagem:
 *   1. coloque o arquivo em `public/images/<grupo>/` (nome em minúsculas,
 *      sem acento nem espaço, ex.: `casca-de-anta.webp`);
 *   2. registre o caminho abaixo;
 *   3. rode `pnpm test:run` — o teste `images.test.ts` garante que todo
 *      caminho registrado existe e que nenhum arquivo ficou sem registro.
 *
 * As chaves (ANGICO, TEA, ...) seguem os mesmos nomes de `INGREDIENT_KEYS`
 * e `INSTRUMENTS_KEYS`, o que permite buscar a imagem pela key da entidade.
 * (As keys ficam como string aqui porque `shared` não pode importar de
 * `entities` na arquitetura Feature-Sliced Design.)
 */

const ROOT = "/images"

/** Plantas — `public/images/plants/` */
export const PLANT_IMAGES = {
  ANGICO: `${ROOT}/plants/angico.webp`,
  GUINE: `${ROOT}/plants/guine.webp`,
  JURUBEBA: `${ROOT}/plants/jurubeba.webp`,
  JATOBA: `${ROOT}/plants/jatoba.webp`,
  HORTELA: `${ROOT}/plants/hortela.webp`,
  ROMA: `${ROOT}/plants/roma.webp`,
  ASSA_PEIXE: `${ROOT}/plants/assa-peixe.webp`,
  MASTRUCO: `${ROOT}/plants/mastruco.webp`,
  CAJUEIRO: `${ROOT}/plants/cajueiro.webp`,
  AROEIRA: `${ROOT}/plants/aroeira.webp`,
  BARBATIMAO: `${ROOT}/plants/barbatimao.webp`,
  CASCA_DE_ANTA: `${ROOT}/plants/casca-de-anta.webp`,
  ACAFRAO_DA_TERRA: `${ROOT}/plants/acafrao-da-terra.webp`,
  QUINA_DO_CERRADO: `${ROOT}/plants/quina-do-cerrado.webp`,
  GENGIBRE: `${ROOT}/plants/gengibre.webp`,
} as const

/**
 * Bases (água / óleo / álcool) — `public/images/bases/`
 * PENDENTE: a arte da ÁGUA (`water.webp`) ainda não foi entregue. Enquanto
 * não existir, a UI mostra o ícone de fallback. Quando chegar, é só
 * descomentar a linha abaixo.
 */
export const BASE_IMAGES = {
  // WATER: `${ROOT}/bases/water.webp`,
  OIL: `${ROOT}/bases/oil.webp`,
  ALCOHOL: `${ROOT}/bases/alcohol.webp`,
} as const

/** Utensílios — `public/images/utensils/` */
export const UTENSIL_IMAGES = {
  CATAPLASM: `${ROOT}/utensils/cataplasm.webp`,
  POWDER: `${ROOT}/utensils/powder.webp`,
  SUGAR: `${ROOT}/utensils/sugar.webp`,
  TEA: `${ROOT}/utensils/tea.webp`,
  BOTTLE: `${ROOT}/utensils/bottle.webp`,
} as const

export type CharacterExpression = "idle" | "talking1" | "talking2" | "angry" | "happy"

type CharacterSprites = Partial<Record<CharacterExpression, string>> & {
  idle: string
}

/**
 * Personagens — `public/images/characters/<nome>/`
 * A Luciana não tem sprite "neutro": o "feliz" é usado como `idle`.
 */
export const CHARACTER_IMAGES = {
  luciana: {
    idle: `${ROOT}/characters/luciana/happy.webp`,
    happy: `${ROOT}/characters/luciana/happy.webp`,
    talking1: `${ROOT}/characters/luciana/talking-1.webp`,
    talking2: `${ROOT}/characters/luciana/talking-2.webp`,
    angry: `${ROOT}/characters/luciana/angry.webp`,
  },
  luiz: {
    idle: `${ROOT}/characters/luiz/idle.webp`,
    talking1: `${ROOT}/characters/luiz/talking-1.webp`,
    talking2: `${ROOT}/characters/luiz/talking-2.webp`,
    angry: `${ROOT}/characters/luiz/angry.webp`,
  },
  amanda: {
    idle: `${ROOT}/characters/amanda/idle.webp`,
    talking1: `${ROOT}/characters/amanda/talking-1.webp`,
    talking2: `${ROOT}/characters/amanda/talking-2.webp`,
    angry: `${ROOT}/characters/amanda/angry.webp`,
  },
  protagonist: {
    idle: `${ROOT}/characters/protagonist/idle.webp`,
  },
  girassolino: {
    idle: `${ROOT}/characters/girassolino/idle.webp`,
  },
} as const satisfies Record<string, CharacterSprites>

export type CharacterName = keyof typeof CHARACTER_IMAGES

/**
 * Cenas — `public/images/scenes/`
 * PENDENTE: `start-screen.webp` (ilustração da tela inicial) ainda não foi
 * entregue; a tela inicial usa um ícone de fallback até lá.
 */
export const SCENE_IMAGES: { START_SCREEN?: string } = {
  // START_SCREEN: `${ROOT}/scenes/start-screen.webp`,
}

/** Tudo agrupado, para quem quiser `IMAGES.plants.ANGICO` etc. */
export const IMAGES = {
  plants: PLANT_IMAGES,
  bases: BASE_IMAGES,
  utensils: UTENSIL_IMAGES,
  characters: CHARACTER_IMAGES,
  scenes: SCENE_IMAGES,
} as const

// ---------- Helpers de busca por key (retornam undefined se pendente) ----------

const INGREDIENT_IMAGES: Record<string, string | undefined> = {
  ...PLANT_IMAGES,
  ...BASE_IMAGES,
}

const UTENSILS_BY_KEY: Record<string, string | undefined> = UTENSIL_IMAGES

/** Imagem de planta/base pela `INGREDIENT_KEYS`. */
export function getIngredientImage(key: string): string | undefined {
  return INGREDIENT_IMAGES[key]
}

/** Imagem de utensílio pela `INSTRUMENTS_KEYS`. */
export function getUtensilImage(key: string): string | undefined {
  return UTENSILS_BY_KEY[key]
}

/** Sprite de um personagem; cai no `idle` se a expressão não existir. */
export function getCharacterImage(
  name: CharacterName,
  expression: CharacterExpression = "idle"
): string {
  const sprites: CharacterSprites = CHARACTER_IMAGES[name]
  return sprites[expression] ?? sprites.idle
}

/** Lista plana de todos os caminhos registrados (usada pelo teste). */
export function getAllRegisteredImagePaths(): string[] {
  const paths: string[] = []

  const walk = (value: unknown) => {
    if (typeof value === "string") paths.push(value)
    else if (value && typeof value === "object") Object.values(value).forEach(walk)
  }

  walk(IMAGES)

  return Array.from(new Set(paths))
}
