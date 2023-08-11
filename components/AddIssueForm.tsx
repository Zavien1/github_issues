"use client";

import { useState, useEffect } from "react";

interface Issue {
  id: number;
  title: string;
  body: string;
}

export const AddIssuesForm = () => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [url, setUrl] = useState("");

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
    const issueData = await res.json();

    // save issue to DB via API
    if (res.ok) {
      const response = await fetch("/api/issue/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: issueData.id,
          title: issueData.title,
          body: issueData.body,
          author: issueData.user.login,
          state: issueData.state,
          createdAt: new Date(issueData.created_at),
        }),
      });

      if (response.ok) {
        const text = await response.text();
        if (text) {
          const savedIssue = JSON.parse(text);
          setIssue(savedIssue);
        } else {
          console.error("The response from /api/issue/create is empty.");
        }
      } else {
        const errorText = await response.text();
        console.error("Error from /api/issue/create:", errorText);
      }
    } else {
      // Handle error
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
          autoComplete="off"
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
