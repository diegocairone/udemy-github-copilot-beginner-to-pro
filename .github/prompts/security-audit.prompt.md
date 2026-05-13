---
agent: ask
title: Security Audit Instructions
---

## Objective

Perform a security audit of this codebase to detect any potential security vulnerabilities in this project.

## Instructions

Analyze the codebase and output your findings as a **Markdown-formatted table** with the following columns:

- **ID**  
  - Must start at `1`
  - Must auto-increment for each issue

- **Severity**

- **Issue**

- **File Path**  
  - Must be an **actual clickable link** to the file

- **Line Number(s)**

- **Recommendation**

## Follow-up Workflow

1. After presenting the table, **ask the user which issues they want to fix**.
2. The user may respond with:
   - `"all"` to fix every issue, or
   - A **comma-separated list of issue IDs** (for example: `1,3,5`).
3. Based on the user’s response, run a **separate sub-agent** (`#runSubagent`) for each selected issue.
4. Each sub-agent must report back with a simple status:

   ```text
   subAgentSuccess: true | false