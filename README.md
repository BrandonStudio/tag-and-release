# GitHub Action &ndash; Tag and Release

Automatically create tags and corresponding releases.

## Usage

This action is meant to be invoked in response to a branch push to create
a tag and a corresponding release, under the assumption that you can derive
the tag name automatically.
In contrast,
[`actions/create-release`](https://github.com/actions/create-release)
is generally run on a tag push, expects the tag to already exist
and only creates the release.

The only mandatory input parameter is the tag name.

    on: push
    jobs:
      release:
        runs-on: ubuntu-latest
        steps:
          - uses: avakar/tag-and-release@v1
            with:
              tag_name: ${{ ... }}
            env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

### Inputs

* `tag_name`: the name of the tag to be created
* `commit`: the commit to which the new tag should point, defaults to `${{ GITHUB_SHA }}`
* `release_name`: the name of the new release; if omitted, defaults to `tag_name`
* `body`: optional text of the release body
* `draft`: set to `true` to create an unpublished (draft) release; defaults to `false`
* `prerelease`: whether the release should be marked as a prerelease.
* `discussion_category_name`: If specified, a discussion of the specified category is created and linked to the release. The value must be a category that already exists in the repository. For more information, see [Managing categories for discussions in your repository](https://docs.github.com/discussions/managing-discussions-for-your-community/managing-categories-for-discussions-in-your-repository).
* `generate_release_notes`: Whether to automatically generate the name and body for this release. If `name` is specified, the specified name will be used; otherwise, a name will be automatically generated. If `body` is specified, the body will be pre-pended to the automatically generated notes.
* `make_latest`: Specifies whether this release should be set as the latest release for the repository. Drafts and prereleases cannot be set as latest. Defaults to `true` for newly published releases. `legacy` specifies that the latest release should be determined based on the release creation date and higher semantic version.


### Outputs

* `id`: the ID of the release
* `html_url`: the human-readable web-page of the release, e.g. `https://github.com/avakar/tag-and-release/releases/v1.0.0`
* `upload_url`: the URL you can give to `@actions/upload-release-asset`
* `discussion_url`: The URL of the release discussion.
