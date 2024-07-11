import * as z from "zod";

export const newCardFormSchema = z.object({
  type: z.string().min(2, {
    message: "Wybierz typ karty",
  }),
  collectionId: z.string().min(2, {
    message: "Wybierz wersję karty",
  }),
  amount: z.coerce
    .number()
    .min(1, { message: "Wybierz ilość powtórzeń" })
    .max(10, { message: "Maksymalna ilość powtórzeń to 10" }),
  content: z
    .string()
    .min(5, {
      message: "Wpisz treść karty (min 5 znaków)",
    })
    .max(80, { message: "Maksymalna ilość znaków to 80" }),
  punishment: z.coerce.number().min(1, {
    message: "Wybierz karę",
  }),
});
