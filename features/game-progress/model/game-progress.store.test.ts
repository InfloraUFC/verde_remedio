import { beforeEach, describe, expect, it } from "vitest"
import { useGameProgressStore } from "./game-progress.store"

describe("useGameProgressStore", () => {
  beforeEach(() => {
    useGameProgressStore.getState().resetGame()
  })

  it("starts at level 1 with full lives and 0 stars", () => {
    const state = useGameProgressStore.getState()
    expect(state.levelId).toBe(1)
    expect(state.stars).toBe(0)
    expect(state.lives).toBe(5)
    expect(state.status).toBe("playing")
  })

  it("a wrong potion costs 1 life and keeps the same client", () => {
    useGameProgressStore.getState().registerBrewAttempt("failure")

    const state = useGameProgressStore.getState()
    expect(state.lives).toBe(4)
    expect(state.client.clientIndex).toBe(0)
    expect(state.client.attempts).toBe(1)
  })

  it("running out of lives sends the player back to level 1", () => {
    const { registerBrewAttempt } = useGameProgressStore.getState()
    for (let i = 0; i < 5; i++) registerBrewAttempt("failure")

    const state = useGameProgressStore.getState()
    expect(state.status).toBe("gameOver")
    expect(state.levelId).toBe(1)
    expect(state.lives).toBe(5)
  })

  it("a full match grants 50 stars", () => {
    useGameProgressStore.getState().registerBrewAttempt("success")
    expect(useGameProgressStore.getState().stars).toBe(50)
  })

  it("a partial match grants 25 stars", () => {
    useGameProgressStore.getState().registerBrewAttempt("partial")
    expect(useGameProgressStore.getState().stars).toBe(25)
  })

  it("reaching the level's star requirement advances to the next level and resets lives/stars", () => {
    const { registerBrewAttempt } = useGameProgressStore.getState()
    registerBrewAttempt("success") // 50/100
    registerBrewAttempt("success") // 100/100 -> nível 2

    const state = useGameProgressStore.getState()
    expect(state.levelId).toBe(2)
    expect(state.stars).toBe(0)
    expect(state.lives).toBe(5) // vida do nível 2 (doc: 5 vidas)
  })

  it("opening the book cancels the level's 10-star bonus, but totalStars still accumulates the base reward", () => {
    const { markBookOpened, registerBrewAttempt } = useGameProgressStore.getState()
    markBookOpened()
    registerBrewAttempt("success")
    registerBrewAttempt("success") // completa o nível 1 (100 estrelas)

    const state = useGameProgressStore.getState()
    expect(state.totalStars).toBe(100) // sem bônus, já que abriu o livro
  })

  it("not opening the book grants a 10-star bonus to totalStars on level completion", () => {
    const { registerBrewAttempt } = useGameProgressStore.getState()
    registerBrewAttempt("success")
    registerBrewAttempt("success")

    expect(useGameProgressStore.getState().totalStars).toBe(110)
  })
})
