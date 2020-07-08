/**
 * @fileoverview Tests for the comment() function.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { comment } from "../src/comment.js";
import { expect } from "chai";
import nock from "nock";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const issue = "@humanwhocodes/github-comment#1";
const message = "Comment!";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("comment()", () => {
    describe("Errors", () => {
        
        it("should error when environment variable is missing", () => {

            return comment(issue, message, {}).catch(ex => {
                expect(ex.message).to.match(/GITHUB_TOKEN/);
            });
            
        });
        
        it("should error when there is no issue to comment on", () => {
            
            return comment(undefined, "").catch(ex => {
                expect(ex.message).to.match(/Missing issue/);
            });
            
        });
        
        it("should error when the issue ID is invalid", () => {
            
            return comment("a/b", "").catch(ex => {
                expect(ex.message).to.match(/Invalid issue/);
            });
            
        });
        
        it("should error when there is no comment to post", () => {
            
            return comment(issue, "").catch(ex => {
                expect(ex.message).to.match(/Missing comment/);
            });
            
        });
        
    });

    it("should send a comment when there's a message and environment variables", () => {

        nock("https://api.github.com", {
            reqheaders: {
                authorization: "token foo"
            }
        }).post(
            "/repos/%40humanwhocodes/github-comment/issues/1/comments",
            {
                body: "comment!"
            }
        ).reply(200, { result: "Success!" });

        return comment(issue, "comment!", {
            GITHUB_TOKEN: "foo"
        }).then(response => {
            expect(response.data.result).to.equal("Success!");
        });

    });

});
