
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'
import Book from '@/models/Book';

export async function POST(request: NextRequest) {
  try {
    
    // const res = await request.json();
    // const { author, title } = res;


    // const book = new Book({
    //   author,
    //   title
    // });

    // const result = book
    //     .save()
    //     .then()
    //     .catch();

    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Internal server error' })
  }
}