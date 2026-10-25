"use client"

import { Leaf } from "lucide-react"
import {
  Badge,
  BookIcon,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  ItemImage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui"
import {
  Ingredient,
  INGREDIENT_KINDS,
  INGREDIENTS,
  Recipe,
  TREATMENT_LABELS,
} from "@/entities"
import { getLevel, getUnlockedRecipes } from "@/entities/level"
import { useGameProgressStore } from "@/features/game-progress"
import { FlipBook } from "./flip-book"

export function BookDialog() {
  const levelId = useGameProgressStore((s) => s.levelId)
  const markBookOpened = useGameProgressStore((s) => s.markBookOpened)

  const unlockedRecipes = getUnlockedRecipes(getLevel(levelId))
  const unlockedPlantKeys = new Set(
    unlockedRecipes.flatMap((recipe) => recipe.ingredients)
  )
  const plants = INGREDIENTS.filter(
    (i) => i.kind === INGREDIENT_KINDS.PLANT && unlockedPlantKeys.has(i.key)
  )

  return (
    <Dialog onOpenChange={(open) => open && markBookOpened()}>
      <DialogTrigger asChild>
        <button
          title="Abrir o livro de plantas e receitas"
          className="animate-book-glow flex flex-col items-center gap-1 rounded-2xl bg-brand-brown px-5 py-3 text-amber-50 shadow-lg ring-2 ring-amber-200/70 transition hover:-translate-y-0.5 hover:ring-amber-100"
        >
          <BookIcon className="size-10" />
          <span className="font-serif text-sm font-bold tracking-wide">
            Livro
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="h-[80vh] w-full max-w-6xl! border-none bg-amber-600 p-0 shadow-none">
        <DialogTitle className="sr-only">Livro de plantas e receitas</DialogTitle>

        <Tabs
          defaultValue="plants"
          className="flex h-full flex-col overflow-hidden rounded-xl shadow-2xl"
        >
          <TabsList className="mx-auto mt-2 bg-amber-200/85">
            <TabsTrigger value="plants">Plantas</TabsTrigger>
            <TabsTrigger value="recipes">Receitas</TabsTrigger>
          </TabsList>

          <TabsContent value="plants" className="mt-2 min-h-0 flex-1">
            <FlipBook items={plants} renderItem={renderPlantPage} />
          </TabsContent>

          <TabsContent value="recipes" className="mt-2 min-h-0 flex-1">
            <FlipBook items={unlockedRecipes} renderItem={renderRecipePage} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function renderPlantPage(plant: Ingredient) {
  return (
    <div className="flex flex-col gap-2">
      <ItemImage
        src={plant.image}
        alt={plant.popularName}
        icon={<Leaf className="size-8" />}
        className="size-20 rounded-md bg-white/70 text-emerald-800 ring-1 ring-black/10"
      />

      <h3 className="font-serif text-lg font-semibold text-amber-950">
        {plant.popularName}
      </h3>

      {plant.scientificName && (
        <p className="text-xs text-amber-900/70 italic">
          {plant.scientificName}
          {plant.family && ` · ${plant.family}`}
        </p>
      )}

      <div className="flex flex-wrap gap-1">
        {plant.properties.map((property) => (
          <Badge key={property} variant="secondary">
            {property}
          </Badge>
        ))}
      </div>

      {plant.observation && (
        <p className="text-sm leading-relaxed text-amber-900/80">
          {plant.observation}
        </p>
      )}
    </div>
  )
}

function renderRecipePage(recipe: Recipe) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-lg font-semibold text-amber-950">
          {recipe.name}
        </h3>
        <Badge>{TREATMENT_LABELS[recipe.treatmentFor]}</Badge>
      </div>

      <p className="text-sm text-amber-900/80">{recipe.description}</p>

      <div className="flex flex-wrap gap-1">
        {recipe.properties.map((property) => (
          <Badge key={property} variant="secondary">
            {property}
          </Badge>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-amber-900/80">
        {recipe.preparation}
      </p>

      {recipe.clients && recipe.clients.length > 0 && (
        <p className="text-xs text-amber-900/60">
          Cliente: {recipe.clients.map((c) => c.name).join(", ")}
        </p>
      )}
    </div>
  )
}
