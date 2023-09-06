
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'
import Author from '@/models/Author';

export async function POST(request: NextRequest) {
  try {
    
    const res = await request.json();
    const { name } = res;


    const author = new Author({
        name
    });

    const result = author
        .save()
        .then()
        .catch();

    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Internal server error' })
  }
}