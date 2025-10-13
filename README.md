Osama Youssef Productions - Final ZIP (client-side embeds)
---------------------------------------------------------

How to use:
1. Unzip the folder.
2. Replace public/videos/project1.mp4, project2.mp4, project3.mp4 with your real MP4s (same filenames).
3. Replace public/logo.png with your high-res logo if you have it (same filename).
4. Install dependencies: npm install
5. Run locally: npm run dev
6. Deploy to Vercel: vercel --prod OR import the folder/repo into Vercel

Notes:
- Instagram reels are embedded client-side; on localhost they may not always preview due to Instagram's restrictions. On a public Vercel URL they work reliably.
- All pages are client components to avoid hydration mismatch issues.
