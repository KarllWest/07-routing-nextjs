import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api'; 
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    
    const res = await fetch(`${API_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Note not found or API Error' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API Route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to delete note' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}