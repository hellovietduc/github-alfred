# github-alfred

> Nagivate GitHub within Alfred

## Install

*Requires [Node.js](https://nodejs.org/) 8+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*

Download the latest workflow from the [releases](https://github.com/hellovietduc/github-alfred/releases) page.

After importing into Alfred, set these [workflow variables](https://www.alfredapp.com/help/workflows/advanced/variables/):

```
USERNAME = <your GitHub username>
ACCESS_TOKEN = <an optional personal access token>
```

If you'd like to navigate your work on private repos, a [token](https://github.com/settings/tokens) with *Full control of private repositories* (`repo`) scope is required. Otherwise, a token with `public_repo` scope is enough.

## Usage

| Functionality               | Keyword              |
| --------------------------- | -------------------- |
| Search open pull requests   | `pr <search terms>`  |
| Search merged pull requests | `prm <search terms>` |
| Search starred repos        | `str <search terms>` |

Press `Enter` to open in your default browser. Press `Cmd` + `Enter` to copy URL to clipboard.

## License

MIT © [Duc Nguyen](./LICENSE)
