## Install dependencies and run:

```bash
# npm
npm install
npm run dev

# yarn
yarn
yarn dev

# pnpm
pnpm install
pnpm dev
```

## Results

1. Model Overview: https://model-page.vercel.app/
2. Model Details: https://model-page.vercel.app/model/sam `NOTE: File upload does not work when deployed on Vercel (See below)`

## Design Choices

1. `React Server Components` were used for data fetching (for the home page as well as specific model pages).
2. `React Client Components` were used for sorting/filtering/file uploading.
3. NextJS's `API Routes` were used to build the API.
4. Nothing was persisted in DB, newly uploaded files are stored in memory and will be lost once the server refreshes. File uploads will `ONLY` work when running locally, and will not work when deployed on Vercel. In practice, all file uploads can be persisted with S3 or similar services.
5. Used MUI's built in breakpoints for mobile/desktop compatibility.
6. Used this template as a starting point (https://github.com/mui/material-ui/tree/master/examples/material-next-app-router-ts)
7. Most of the focus was on the layout of the application, not much styling has been done.
8. `string-similarity` was used for the search functionalities.

## Challenges

1. Decided to use the recently released `App Router`, had to essentially re-learn NextJS.
2. Time constraints: I have to move out in 24 hours, so I've been juggling around different tasks and had to do this in between different things :(
3. Not sure if the project requirement is Huggingface's models overview(https://huggingface.co/models) or a specific model(https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0). I decided to implement both.
