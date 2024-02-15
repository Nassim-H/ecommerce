// pages/api/store.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest) {

    try {
        const { userId } = auth();
        const { name } = req.body;

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
