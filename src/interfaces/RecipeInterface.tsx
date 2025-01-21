interface Step {
  number: number;
  step: string;
}

interface Instruction {
  steps: Step[];
}

interface Ingredient {
  id: number;
  original: string;
}

export interface Recipe {
  id: string;
  image: string;
  title: string;
  summary: string;
  extendedIngredients: Ingredient[];
  analyzedInstructions: Instruction[];
}
