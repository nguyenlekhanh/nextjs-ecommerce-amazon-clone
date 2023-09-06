
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

type ResponseData = {
  message: string
}

export async function GET(request: NextRequest) {
  try{
    return NextResponse.json({ message: 'Success' })
  } catch(e) {
    console.log(e);
    return NextResponse.json({ message: 'Internal server error' })
  }
}

export async function POST(request: NextRequest) {
  try {
    // console.log(request.body);
    //https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body
    // const res = await request.json();
    // console.log('res');
    // console.log(res);

    //const forwarded = request.headers["x-real-ip"] as string;
    //console.log(forwarded);

    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Internal server error' })
  }
}