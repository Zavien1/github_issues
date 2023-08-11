import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const getIssues = cache(async () => {
  const issues = await prisma.issue.findMany();
  return issues;
});
