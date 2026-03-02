import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api/auth';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const data = await res.json();
  return NextResponse.json(data);
}