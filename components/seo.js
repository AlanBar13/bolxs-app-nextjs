import Head from "next/head"

export default function SEO({ title, description, image }) {
    return(
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="og:title" content={title} />
            <meta
                name="description"
                content={`${description}`}
            />
            {image && <meta itemProp="image" content={image} />}
            <meta name="twitter:card" content="summary_large_image" />
            <title>{title}</title>
        </Head>
    )
}