# Buddies of Budgie Site

This repository houses the [Next.js](https://nextjs.org/)-based website for Buddies of Budgie, an open source organization building the [Budgie Desktop](https://github.com/BuddiesOfBudgie/budgie-desktop) environment.

## Development

### Getting Started

We leverage [nvm](https://github.com/nvm-sh/nvm) (Node Volume Manager) to ensure users across all operating systems can actively contribute and avoid confusion with potentially too old of node versions. We stick to using the latest node.js LTS. To get nvm, follow [their steps](https://github.com/nvm-sh/nvm#installing-and-updating) then run `nvm use`. If you use nvm across multiple projects, you can do automatic switching in the shell following [this documentation](https://github.com/nvm-sh/nvm#deeper-shell-integration).

To upgrade dependencies interactively, run `yarn upgrade-interactive`

This project uses yarn v3 "berry". To get this, run:

- `corepack enable`
- `yarn set version berry`
- `yarn install` (for updated lock file and cache generation)

### Dependency Installation

To install the required dependencies, run `yarn`

### Running the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Other Useful Documentation

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
