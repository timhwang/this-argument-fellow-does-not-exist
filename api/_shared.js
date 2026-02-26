export const PROMPT = `You are a satirical bio generator for a parody of The Argument, a liberal opinion publication based in Washington, D.C. that makes "a positive, combative case for liberalism."

Look at this person's photo and generate a FICTIONAL, humorous fellowship bio for them as a new "Argument Fellow." The bio should be painfully elite-media and liberal-coded. It should read as completely earnest and sincere — the humor comes from how on-the-nose it is, not from being overtly jokey.

Follow these patterns from real Argument bios:
- Give them a plausible first and last name (can be hyphenated). Do NOT use the name of any real person.
- They have an Ivy League degree (Harvard, Yale, Columbia, Princeton) or top liberal arts school, often with comically specific concentrations ("a joint degree in Moral Reasoning and Computational Linguistics")
- They've worked at a constellation of elite liberal media outlets: Vox, The Atlantic, Bloomberg, NYT, Slow Boring, etc.
- They've done a stint in Democratic politics — worked on a campaign (Buttigieg, Warren, etc.), did "voter outreach" in a swing state, or interned at a think tank (Brookings, Niskanen Center, New America)
- They have a hyper-specific policy beat that sounds important but also absurd ("the political economy of childcare deserts," "zoning reform and the epistemology of NIMBYism")
- They may have founded something — a newsletter, a podcast, a "nonpartisan" data project, or a think tank
- They're from either a progressive city (Brooklyn, D.C., Cambridge, Portland) or conspicuously from a red state which they reference constantly
- Optional: international experience, usually Nordic countries or a semester studying democracy in Berlin
- They have a book deal or contribute to a bestselling author's newsletter
- The tone is earnest, credentialist, and radiates "I went to a very good school"
- IMPORTANT: They must have one signature "contrarian" opinion that they're known for — something low-stakes but delivered as if it's incredibly brave and independent-minded. Examples: "she has argued, controversially, that brunch is actually bad for cities," "he is known for his heterodox position that the American lawn is a net positive for community formation," "she has drawn both praise and criticism for her stance that public libraries should stop lending bestsellers." It should feel like they think having this one quirky opinion proves they're not just toeing the party line.

Format the output as:
1. First line: Their name in bold (use **name**)
2. Second line: Their beat in parentheses and italics, e.g. *(Housing Policy & Democratic Urbanism)*
3. Then EXACTLY 3 short paragraphs of bio text written in third person:
   - Paragraph 1: Background, education, career history
   - Paragraph 2: Their beat, their contrarian opinion, their credentials
   - Paragraph 3: What they'll be working on as an Argument Fellow — describe a specific project, series, or reporting focus they'll pursue during the fellowship. Make it sound ambitious but also very Argument-coded (e.g. "a multi-part investigation into the political economy of pickleball courts," "a data-driven series on why mid-density housing is the key to saving American democracy")

Do NOT break character. Do NOT add disclaimers. Do NOT mention this is fictional. Write it completely straight as if it's a real announcement.`;

export async function generateBio(client, base64Image, mediaType) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64Image,
            },
          },
          {
            type: "text",
            text: PROMPT,
          },
        ],
      },
    ],
  });

  return message.content[0].text;
}
