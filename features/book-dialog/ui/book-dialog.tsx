"use client"

import { BookOpen, Leaf } from "lucide-react"
import {
  Badge,
  Button,
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
  getIngredientByKey,
  getInstrumentByKey,
  Ingredient,
  INGREDIENT_KINDS,
  INGREDIENTS,
  Recipe,
  RECIPES,
  TREATMENT_LABELS,
} from "@/entities"
import { FlipBook } from "./flip-book"

const PLANTS = INGREDIENTS.filter((i) => i.kind === INGREDIENT_KINDS.PLANT)

export function BookDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Livro de plantas e receitas">
          <BookOpen className="size-5" />
        </Button>
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
            <FlipBook items={PLANTS} renderItem={renderPlantPage} />
          </TabsContent>

          <TabsContent value="recipes" className="mt-2 min-h-0 flex-1">
            <FlipBook items={RECIPES} renderItem={renderRecipePage} />
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
  const instrument = getInstrumentByKey(recipe.type)

  const ingredientNames = recipe.ingredients
    .map((key) => getIngredientByKey(key)?.popularName)
    .filter(Boolean)
    .join(" + ")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-lg font-semibold text-amber-950">
          {recipe.name}
        </h3>
        <Badge>{TREATMENT_LABELS[recipe.treatmentFor]}</Badge>
      </div>

      <p className="text-sm text-amber-900/80">{recipe.description}</p>

      <p className="text-xs font-medium text-amber-900/70 capitalize">
        {instrument.type} · {ingredientNames} + {instrument.name}
      </p>

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
