"use client"
import { Link2Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { scrapeCheck, scrapeURL } from "./actions";

// check url scraping
async function checkURL(f: FormData) {
  // get url
  const inputUrl = f.get("url")
  if (!inputUrl) return toast.error("Please enter a URL", {duration: 5000});
  // scrape check
  toast.loading("Checking if scraping is allowed...", { duration: 5000 });
  const res = await scrapeCheck(inputUrl as string);
  // result
  if (res) toast.success("Scraping is allowed", {duration: 5000});
  else toast.error("Scraping is not allowed", {duration: 5000});
}

// scrape URL
async function scrape(f: FormData) {
  // get url
  const inputUrl = f.get("url");
  if (!inputUrl) return toast.error("Please enter a URL", {duration: 5000});
  // scrape
  toast.loading(`Scraping ${inputUrl} ...`, {duration: 5000});
  const res = await scrapeURL(inputUrl as string);
  if (!res) return toast.error("Failed to scrape the URL", {duration: 5000});
  // download
  const blob = new Blob([res], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `scraped-${f.get("url")!}.html`
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function Home() {
  const [url, setUrl] = useState("");
  return (
    <React.Fragment>
      {/* Title */}
      <h1 className="md:text-[60px] text-[30px] font-bold">Scrape Check Demo</h1>
      <div className="flex flex-col w-full items-center justify-center gap-2">
        {/* Main Input */}
        <div className="flex w-11/12 md:w-2/5 items-center space-x-2 p-4 bg-slate-100 rounded-lg">
          <Link2Icon className="h-5 w-5" />
          <input type="text" placeholder="Enter a URL....." className="outline-none bg-transparent w-4/5" onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 px-2 flex-col md:flex-row ">
          {/* Check Button */}
          <form action={checkURL}>
            <input type="text" name="url" hidden readOnly value={url} required />
            <button type="submit" className="w-[250px] p-2 text-sm bg-slate-100 rounded-md ">Can i scrape that?</button>
          </form>
          {/* Scrape Button */}
          <form action={scrape}>
            <input type="text" name="url" hidden readOnly value={url} required />
            <button type="submit" className="w-[250px] p-2 text-sm bg-slate-100 rounded-md ">Scrape URL</button>
          </form>
        </div>
      </div>
      <Toaster />
    </React.Fragment>
  );
}