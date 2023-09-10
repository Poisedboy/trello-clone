import { z } from "zod";

export const createBoardsDto = z.object({
    title: z.string().min(1).max(20),
});

export type CreateBoardDto = z.infer<typeof createBoardsDto>

export const updateBoardDto = createBoardsDto.partial();