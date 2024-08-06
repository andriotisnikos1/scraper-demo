"use server"

import axios from "axios";

export async function scrapeCheck(url: string) {
    try {
        const options = {
            url: 'https://crawl-and-scrape-check.p.rapidapi.com/check',
            params: {
              url,
              agent: 'ScrapeBot'
            },
            headers: {
              'X-RapidAPI-Key': '69cdfb350dmsh2ba00cf2924677cp175cbejsn576f660b8876',
              'X-RapidAPI-Host': 'crawl-and-scrape-check.p.rapidapi.com'
            }
          };
          
        const res = await axios.get<{allowed: boolean}>(options.url, {params: options.params, headers: options.headers});
        return res.data.allowed
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function scrapeURL(url: string) {
    try {
        const options = {
            url: 'https://crawl-and-scrape-check.p.rapidapi.com/scrape',
            params: {
              url,
              selector: 'body',
              unwantedFields: 'link,script,head'
            },
            headers: {
              'X-RapidAPI-Key': '69cdfb350dmsh2ba00cf2924677cp175cbejsn576f660b8876',
              'X-RapidAPI-Host': 'crawl-and-scrape-check.p.rapidapi.com'
            }
          };
          
          const res = await axios.get<{
            content: string
          }>(options.url, {params: options.params, headers: options.headers});
            return res.data.content
    } catch (error) {
        console.error(error)
        return null
    }
}