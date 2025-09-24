import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = typeof body?.message === 'string' ? body.message : '';

    // Stub response to keep UI functional until provider is wired
    const text = message
      ? `Thanks for your message. This is a placeholder response for: \n\n${message}`
      : 'Hello from ESGEN. The AI service is not configured yet. Please try again later.';

    return NextResponse.json({ data: { response: text } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: 'AI endpoint error', detail: String(error) }, data: { response: null } },
      { status: 200 }
    );
  }
}


