# Buddies of Budgie Site

**Important Note: Heavy Work-in-Progress, hence issues being disabled. PRs will be rejected. Expect breakages and incomplete work. Thanks for your understanding :)**

This repository houses the [Next.js](https://nextjs.org/)-based website for Buddies of Budgie, an open source organization building the [Budgie Desktop](https://github.com/BuddiesOfBudgie/budgie-desktop) environment. This project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This website uses our [Ghost](https://ghost.org)-based [blog](https://blog.buddiesofbudgie.org) as a data source, fetching publication content for blog content and to be able to provide a more curated and integrated user experience.

Alongside the flagship site, this repository contains all the IaC (Infrastructure as Code) for bootstrapping the Kubernetes cluster (terraform and kubectl), the Ghost blog, nginx ingress, and more. This promotes transparency in how we develop and deploy. (TODO: Add IaC for the site when it is ready.)

### Ghost Content

We leverage our Ghost's read-only [Content API](https://ghost.org/docs/content-api/) for its blog content. As it is read-only and we have absolutely no reason to keep the API token a secret, it is listed below alongside the endpoint info. It is encouraged to use this outside this project, for example if you want to build a Budgie widget that displays the latest news. Just don't abuse it and all is well.

- API Endpoint: `https://blog.buddiesofbudgie.org/ghost/api/v3/`
- Content API Key: `a731339288014003c2846aca07`

### TODO

- [ ] Document IaC
- [ ] Open up for issue reporting and contributions
- [ ] Build MVP
- [ ] Add IaC, GH Actions for deployment

## Development

### Getting Started

We leverage [nvm](https://github.com/nvm-sh/nvm) (Node Volume Manager) to ensure user across all operating systems can actively contribute and avoid confusion with potentially too old of node versions. We stick to using the latest node.js LTS. To get nvm, follow [their steps](https://github.com/nvm-sh/nvm#installing-and-updating) then run `nvm use`. If you use nvm across multiple projects, you can do automatic switching in the shell following [this documentation](https://github.com/nvm-sh/nvm#deeper-shell-integration).

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
