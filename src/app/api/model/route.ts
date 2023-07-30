import { NextResponse } from 'next/server';
import { ModelData } from '../types';
import { headers } from 'next/headers';
import initialData from '../data.json';

export let data: ModelData[] = initialData;

// Fetching all existing models:
// !Not paginated.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ data });
  } else {
    return NextResponse.json({
      model: data.find((model) => {
        return model.name === name;
      }),
    });
  }
}

// Adding new models:
// !Body will not be parsed if content type is not application/json.
export async function PUT(request: Request) {
  const headersList = headers();
  const contentType = headersList.get('Content-Type');

  // 1. Make sure request has a body and the content type is json:
  if (!request.body || contentType !== 'application/json') {
    return NextResponse.json(
      { error: 'No request body specified' },
      { status: 404 }
    );
  }

  // 2. Parse the body and ensure modelData exists:
  const requestJSON = await request.json();
  const modelDataToAdd: ModelData | null = requestJSON.body.modelData;
  if (!modelDataToAdd) {
    return NextResponse.json(
      { error: 'No request body specified' },
      { status: 404 }
    );
  }

  // 3. Add new model data and return updated results:
  data.push(requestJSON.body.modelData);
  return data;
}
