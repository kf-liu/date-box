import Octokit from '@octokit/rest';
import counters from './counters';

const {
    // TYPE: type,
    GH_TOKEN: githubToken,
    GIST_ID: gistId,
    RECORDS: records,
} = process.env;

try {
    if (!GH_TOKEN) {
        throw new Error("GH_TOKEN is not provided.");
    }
    if (!GIST_ID) {
        throw new Error("GIST_ID is not provided.");
    }
    if (!USERNAME) {
        throw new Error("USERNAME is not provided.");
    }
} catch (e) {
    console.error(e);
    process.exitCode = 1;
};

const octokit = new Octokit({ auth: `token ${githubToken}` });

export const main = async () => {
    let gist;
    try {
        gist = await octokit.gists.get({ gist_id: gistId });
    } catch (error) {
        console.error(`Unable to get gist\n${error}`);
    }
    const newContents = counters(records);
    try {
        // Get original filename to update that same file
        const filename = Object.keys(gist.data.files)[0];
        await octokit.gists.update({
            gist_id: gistId,
            files: {
                [filename]: {
                    filename: `🗓 my date box`,
                    content: newContents,
                }
            }
        });
    } catch (error) {
        console.error(`Unable to update gist\n${error}`);
    }
};

(async () => {
    await main();
})();
