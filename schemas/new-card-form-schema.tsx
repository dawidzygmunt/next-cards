import * as z from "zod";

export const newCardFormSchema = z.object({
  type: z.string().min(2, {
    message: "Wybierz typ karty",
  }),
  collectionName: z.string().min(2, {
    message: "Wybierz wersję karty",
  }),
  amount: z.coerce.number().min(1, {
    message: "Wybierz ilość powtórzeń",
  }),
  content: z.string().min(5, {
    message: "Wpisz treść karty",
  }),
  punishment: z.coerce.number().min(1, {
    message: "Wybierz karę",
  }),
});
