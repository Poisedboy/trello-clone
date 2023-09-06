import { NextResponse } from "next/server";
import { createBoardsDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function GET (req: Request) {
     const boards = await prisma.boards.findMany();

     return NextResponse.json(boards);
};

export async function POST (req: Request) {
    const bodyRow = await req.json();
    const validateBody = createBoardsDto.safeParse(bodyRow);

    if(!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {status: 400})
    };

    const {title} = validateBody.data;
    const newBoard = await prisma.boards.create({ data: {
        title,
    }})
    return NextResponse.json(newBoard);
};
