import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from '@octokit/core';
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';

async function main() {
  const commit = getInput('commit') || context.sha;
  const tagName = getInput('tag_name', { required: true });
  const releaseName = getInput('release_name') || tagName;
  const body = getInput('body');
  const draft = getInput('draft') === 'true';
  const prerelease = getInput('prerelease') === 'true';
  const discussion_category_name = getInput('discussion_category_name');
  const generate_release_notes = getInput('generate_release_notes') === 'true';
  const make_latest = getInput('make_latest') as 'true' | 'false' | 'legacy';

  const R = Octokit.plugin(restEndpointMethods);
  const octokit = new R({ auth: process.env.GITHUB_TOKEN });

  const r = await octokit.rest.repos.createRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: tagName,
    target_commitish: commit,
    name: releaseName,
    body,
    draft,
    prerelease,
    discussion_category_name,
    generate_release_notes,
    make_latest,
  });

  setOutput('id', r.data.id.toString());
  setOutput('html_url', r.data.html_url);
  setOutput('upload_url', r.data.upload_url);
  setOutput('discussion_url', r.data.discussion_url);
}

main().catch(function(error) {
  setFailed(error.message);
});
