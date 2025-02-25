import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fileUpload } from "@/lib/file-upload";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.brand.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        _count: {
          select: {
            Item: true,
          },
        },
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const detail = formData.get("detail") as string;
    const image = formData.get("image") as File;

    let filePath: string | null = null;

    if (image && image.name) {
      const filename = await fileUpload(image, "uploads");
      filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;
    }

    const result = await prisma.brand.create({
      data: {
        name: name,
        slug: slug,
        detail: detail,
        image: filePath,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
