# Welcome to Your Dazl Project! 🎉

Your canvas for building beautiful, fast, and user-friendly web applications. This project is designed to help you move from idea to launch quickly, without getting bogged down in technical complexity.

## What You're Getting

Think of this as your complete toolkit for building modern web experiences. Everything you need is already set up and ready to go.

- 🎨 **Beautiful UI Out of the Box** - A complete library of polished, accessible components that look great and work seamlessly together. Buttons, forms, dialogs, navigation—it's all here, styled and ready to use.

- ⚡ **Lightning-Fast Performance** - Your users will love how snappy everything feels. Pages load instantly, interactions are smooth, and your app works great even on slower connections.

- 🎯 **Consistent Design System** - Every color, spacing, and animation follows a cohesive design language. Make changes to your brand in one place, and watch them update everywhere automatically.

- 📱 **Works Everywhere** - Desktop, tablet, mobile—your app adapts beautifully to any screen size without extra work.

## Need Help?

You're never stuck — here's where to look:

|     | Resource                                                                        | What you'll find                                                  |
| --- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 🚀  | **[Getting Started](https://help.dazl.dev)**                                    | Onboarding, core guides, and everything to hit the ground running |
| 🤖  | **[Working with the AI](https://help.dazl.dev/docs/building-with-dazl/design-and-refine/chat-driven-editing)** | Prompting, iterating, inspecting changes, and version management  |
| 🛠️  | **[Using the Dev Tools](https://help.dazl.dev/docs/building-with-dazl/iterate-and-collaborate/inspecting-your-project)** | Elements, Console, and Code panels for precise debugging          |
| 💰  | **[Pricing & Account](https://dazl.dev/pricing)**                               | Plans, credits, and what's included                               |

---

## Deploying to Vercel

This project runs on **React Router v7 in framework (SSR) mode**, which Vercel supports out of the box. The included `vercel.json` makes the deploy fully explicit so it doesn't depend on framework auto-detection.

### 1. Prerequisites

- A GitHub (or GitLab/Bitbucket) repo containing this project
- A free [Vercel account](https://vercel.com/signup)
- Node.js **20.x or later** (configured in Vercel project settings)

### 2. Push the project to GitHub

From Dazl, use the **Export to GitHub** action to push the project to a new repository, or push manually:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 3. Import the project into Vercel

1. Go to the [Vercel dashboard](https://vercel.com/new)
2. Click **Add New → Project**
3. Select your GitHub repo and click **Import**

### 4. Build & Output settings

The repo includes a `vercel.json` that locks in these values, so the import screen should already show them:

| Setting              | Value           |
| -------------------- | --------------- |
| Framework Preset     | `React Router`  |
| Install Command      | `npm install`   |
| Build Command        | `npm run build` |
| Output Directory     | `build/client`  |
| Node.js Version      | `20.x` or later |

> Vercel's React Router v7 integration automatically wires up the SSR server from `build/server/index.js` — no extra configuration needed.

### 5. Environment variables

This project doesn't require any environment variables to run. If you add integrations later (databases, third-party APIs, etc.):

1. Go to **Project → Settings → Environment Variables**
2. Add each key/value for the relevant environments (Production, Preview, Development)
3. Redeploy to apply

### 6. Deploy

Click **Deploy**. After the build finishes (typically 1–2 minutes) you'll get a live URL like `https://your-project.vercel.app`.

### 7. Continuous deployment

- Every push to `main` → **Production** deploy
- Every pull request → **Preview** deploy with its own URL
- Roll back any deploy from **Project → Deployments**

### 8. Custom domain

1. **Project → Settings → Domains**
2. Add your domain and follow the DNS instructions Vercel provides
3. SSL certificates are issued automatically

### 9. Troubleshooting

- **Build fails with a Node version error** → set Node to `20.x` (or later) under **Project → Settings → General → Node.js Version**
- **Framework not detected** → the `vercel.json` forces `"framework": "react-router"`; if Vercel still misdetects, set it manually in the import dialog
- **404 on routes after deploy** → confirm `outputDirectory` is `build/client` and that `npm run build` produced both `build/client` and `build/server` locally
- **Loaders/actions not running** → ensure the project is still in SSR mode (`react-router.config.ts` should not have `ssr: false`)

---

**Built with [Dazl](https://dazl.dev)** · Empowering product teams to build better, faster.
