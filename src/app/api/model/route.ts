import { NextResponse } from 'next/server';
import { ModelData } from '../types';
import { headers } from 'next/headers';
import initialData from '../data.json';

let data: ModelData[] = initialData;

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
export async function POST(request: Request) {
  const headersList = headers();
  const contentType = headersList.get('Content-Type');

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const modelName = formData.get('modelName') as string;
  const fileName = formData.get('name') as string;

  if (!file || !fileName) {
    return NextResponse.json(
      { error: 'File / File name not specified!' },
      { status: 400 }
    );
  }

  // 3. Add new model data and return updated results:
  const modelIndex = data.findIndex((model) => model.name === modelName);

  if (modelIndex !== undefined) {
    if (data[modelIndex].files) {
      data[modelIndex].files = [
        // @ts-ignore
        ...data[modelIndex].files,
        {
          file: file,
          name: fileName,
          uploadDate: new Date(),
          version: data[modelIndex].version,
        },
      ];
      return NextResponse.json(
        {
          model: data[modelIndex],
        },
        { status: 200 }
      );
    } else {
      data[modelIndex].files = [
        {
          file: file,
          name: fileName,
          uploadDate: new Date(),
          version: data[modelIndex].version,
        },
      ];

      return NextResponse.json(
        {
          model: data[modelIndex],
        },
        { status: 200 }
      );
    }
  } else {
    return NextResponse.json(
      {
        error: 'Model not found!',
      },
      { status: 400 }
    );
  }
}
