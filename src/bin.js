/**
 * @fileoverview A CLI for posting GitHub comments.
 * @author Nicholas C. Zakas
 */

/* eslint-disable no-console */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { comment } from "./comment.js";
import dotenv from "dotenv";

//-----------------------------------------------------------------------------
// Setup
//-----------------------------------------------------------------------------

if (process.argv.length < 4) {
    console.error("Usage: @humanwhocodes/github-comment org/repo#1234 \"Comment to post.\"");
    console.error("Missing parameters.");
    process.exit(1);
}

if (process.env.GHC_DOTENV === "1") {
    dotenv.config();
}

/*
 * Command line arguments will escape \n as \\n, which isn't what we want.
 * Remove the extra escapes so newlines can be entered on the command line.
 */
const message = process.argv[2].replace(/\\n/g, "\n");

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

comment(message, process.env)
    .then(response => console.log(JSON.stringify(response, null, 2)))
    .catch(error => {
        if (error.message) {
            console.error(error.message);
        } else {
            console.dir(error);
        }
        process.exit(1);
    });
