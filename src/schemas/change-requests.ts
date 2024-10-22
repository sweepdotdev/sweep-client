import { z } from "zod";

export const changeRequestSchema = z.object({
    packageManager: z.string({ message: "You must enter a package manager." }),
    packageManagerVersion: z.string({ message: "You must enter a package manager version." }),
    command: z.string({ message: "You must enter a command." }),
    eligibleGitNamespaces: z.string({ message: "You must enter at least one namespace" }).array(),
    customBranchName: z.string({ message: "You must enter a branch name." }),
    customCommitMessage: z.string({ message: "You must enter a commit message" }),
    customPullRequestTitle: z.string({ message: "You must enter a pull request title." }),
    dryRun: z.boolean(),
});
