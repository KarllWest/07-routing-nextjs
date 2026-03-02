import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api/auth';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = new URLSearchParams();

  if (searchParams.get('tag')) params.set('tag', searchParams.get('tag')!);
  if (searchParams.get('search')) params.set('search', searchParams.get('search')!);
  if (searchParams.get('page')) params.set('page', searchParams.get('page')!);

  const res = await fetch(`${API_URL}/notes?${params}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}