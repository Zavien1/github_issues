"use client";

import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";

interface Issue {
  id: number;
  title: string;
  body: string;
}

export const AddIssuesForm = () => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [url, setUrl] = useState("");

  const prisma = new PrismaClient();

  const toApiUrl = (publicUrl: string) => {
    // Formats user input URL to match github api url
    const parts = publicUrl.split("/");
    const user = parts[3];
    const repo = parts[4];
    const issueNumber = parts[6];
    return `https://api.github.com/repos/${user}/${repo}/issues/${issueNumber}`;
  };

  // Listen for changes in the url state
  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIssue(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [url]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const publicUrl = (event.target as any).elements.url.value;
    const apiUrl = toApiUrl(publicUrl);

    const res = await fetch(apiUrl);
    const issue = await res.json();

    // save issue to DB
    if (res.ok) {
      const savedIssue = await prisma.issue.create({
        data: {
          id: issue.id,
          title: issue.title,
          body: issue.body,
          author: issue.user.login,
          state: issue.state,
          createdAt: new Date(issue.created_at),
        },
      });

      setIssue(savedIssue);
    } else {
      //   setError(issue);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">GitHub Issue</h1>
      <p className="text-white">
        Copy and paste github issue urls to add to your list
      </p>
      <form onSubmit={handleSubmit}>
        <input
          name="url"
          type="text"
          placeholder="Enter issue URL"
          className="w-full text-black p-2 rounded my-4"
        />
        <button
          className="bg-white rounded-lg text-black p-4 font-bold"
          type="submit"
        >
          Add Issue
        </button>
      </form>
      {issue && (
        <div>
          <h3>{issue.title}</h3>
          <p>{issue.body}</p>
        </div>
      )}
    </div>
  );
};
