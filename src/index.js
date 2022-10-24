import Octokit from '@octokit/rest';
import contents from './contents';

const {
    // TYPE: type,
    GH_TOKEN: githubToken,
    GIST_ID: gistId,
    RECORDS: records,
} = process.env;

try {
    if (!githubToken) {
        throw new Error("GH_TOKEN is not provided.");
    }
    if (!gistId) {
        throw new Error("GIST_ID is not provided.");
    }
    if (!records) {
        throw new Error("RECORDS is not provided.");
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
    const newContents = contents(records);
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
