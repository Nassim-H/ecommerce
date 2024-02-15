// pages/api/store.ts

import { PrismaClient } from '@prisma/client';
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {

        const body = await req.json();
        console.log(body)

        const { userId } = auth();
        const name = body;

        if (!userId) {
            return new NextResponse('Unauthorized', { status : 401 });
        }

        if (!name) {
            return new NextResponse('Name is required', { status : 400 });
        }

        const store = await prisma.store.create({
            data: {
                name,
                userId
            },
        });

        return NextResponse.json(store);
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal server error', { status : 500});
    }
    
}
