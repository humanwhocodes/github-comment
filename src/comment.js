/**
 * @fileoverview Main functionality for tweeting.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { Octokit } from "@octokit/rest";
import { Env } from "@humanwhocodes/env";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

function createIssueObject(issue) {
    const [fullRepoName, issueNumber] = issue.split("#");
    const [owner, repo] = fullRepoName.split("/");

    return {
        owner,
        repo,
        issue_number: issueNumber
    };
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export async function comment(issue, message, options = {}) {

    if (!issue) {
        throw new Error("Missing issue or pull request to comment on.");
    }

    if (!(/[@\-\w]+\/[@\-\w]+#\d+/.test(issue))) {
        throw new Error("Invalid issue format. Must match owner/repo#1234.");
    }

    if (!message) {
        throw new Error("Missing comment to post.");
    }

    const env = new Env(options);

    const {
        GITHUB_TOKEN
    } = env.required;

    const client = new Octokit({
        auth: GITHUB_TOKEN,
        userAgent: "@humanwhocodes/github-comment"
    });

    return client.issues.createComment({
        ...createIssueObject(issue),
        body: message
    });
}
