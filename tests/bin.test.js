/**
 * @fileoverview Tests for the Env class.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { execSync } from "child_process";
import { expect } from "chai";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const command = "node --require esm src/bin.js";

function exec(command, env) {
    return execSync(command, {
        env: {
            ...process.env,
            ...env
        },
        stdio: ["ignore", "pipe", "pipe"]
    });
}


//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("Comment", () => {
    describe("Errors", () => {
        
        it("should error when environment variable is missing", () => {

            expect(() => {
                exec(`${command} owner/repo#123 "hi"`);
            }).to.throw(/GITHUB_TOKEN/);
            
        });
        
        it("should error when issue isn't specified correctly", () => {

            expect(() => {
                exec(`${command} owner/repo123 "hi"`);
            }).to.throw(/Invalid issue/);
            
        });
        
        it("should error when message isn't specified", () => {

            expect(() => {
                exec(`${command} owner/repo123`);
            }).to.throw(/Missing parameters/);
            
        });
        
        it("should error when there is no issue specified", () => {
            
            expect(() => {
                exec(command, {
                    GITHUB_TOKEN: "foo"
                });
            }).to.throw(/Missing parameters/);
            
        });
        
    });

});
