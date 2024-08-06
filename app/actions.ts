"use server"

import axios from "axios";

export async function scrapeCheck(url: string) {
    try {
        const options = {
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'crawl-and-scrape-check.p.rapidapi.com'
            }
        };
        const builtURL = new URL("https://crawl-and-scrape-check.p.rapidapi.com/check")
        builtURL.searchParams.append('url', url)
        builtURL.searchParams.append('agent', 'ScrapeBot')
        const res = await axios.get<{ allowed: boolean }>(builtURL.toString(), { headers: options.headers });
        return res.data.allowed
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function scrapeURL(url: string) {
    try {
        const options = {
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'crawl-and-scrape-check.p.rapidapi.com'
            }
        };
        const builtURL = new URL("https://crawl-and-scrape-check.p.rapidapi.com/scrape")
        builtURL.searchParams.append('url', url)
        builtURL.searchParams.append('selector', 'body')
        builtURL.searchParams.append('unwantedFields', 'link,script,head')
        const res = await axios.get<{
            content: string
        }>(builtURL.toString(), { headers: options.headers });
        return res.data.content
    } catch (error) {
        console.error(error)
        return null
    }
}