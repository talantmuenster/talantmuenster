import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json({ error: 'URL не предоставлен' }, { status: 400 });
    }

    // Decode the URL if needed
    const decodedUrl = decodeURIComponent(imageUrl);
    console.log('Proxying image from:', decodedUrl);

    // Fetch the image from Firebase Storage
    const response = await fetch(decodedUrl);

    if (!response.ok) {
      console.error('Failed to fetch image:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Failed to load image: ${response.status}` },
        { status: response.status }
      );
    }

    // Get the image data
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    // Return the image with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });
  } catch (error: any) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}
