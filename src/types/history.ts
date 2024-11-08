import {z} from "zod"

export const historyRangeSearch = z.object({
  startDate: z.string(),
  endDate: z.string()
})

export type HistoryRangeSearch = z.infer<typeof historyRangeSearch>