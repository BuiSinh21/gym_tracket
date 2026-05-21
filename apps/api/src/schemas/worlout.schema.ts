// apps/api/src/schemas/workout.schema.ts
import { z } from 'zod'

export const CreateWorkoutSchema = z.object({
  name: z.string().min(1).max(100),
  date: z.string().datetime(),
  exercises: z
    .array(
      z.object({
        exerciseId: z.string().uuid(),
        sets: z.number().int().min(1).max(20),
        reps: z.number().int().min(1).max(100),
        weightKg: z.number().min(0).max(999),
      }),
    )
    .min(1),
})

export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>