import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Issue } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const issueData: Issue = JSON.parse(await req.text());
    const savedIssue = await prisma.issue.create({
      data: issueData,
    });
    return NextResponse.json(savedIssue);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
};
