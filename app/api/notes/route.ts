import { NextRequest, NextResponse } from 'next/server';



const API_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();

    if (searchParams.get('tag')) params.set('tag', searchParams.get('tag')!);
    if (searchParams.get('search')) params.set('search', searchParams.get('search')!);
    if (searchParams.get('page')) params.set('page', searchParams.get('page')!);

    const targetUrl = `${API_URL}/notes?${params.toString()}`;
    const res = await fetch(targetUrl, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Помилка від бекенду GoIT:', res.status, errorText);
      return NextResponse.json(
        { error: 'External API Error' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Внутрішня помилка сервера:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Помилка від бекенду GoIT:', res.status, errorText);
      return NextResponse.json(
        { error: 'External API Error' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Внутрішня помилка сервера:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}