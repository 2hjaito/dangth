export interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  languages_url: string;
}

export interface ProcessedRepo {
  url: string;
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  topics: string[];
  lastUpdate: string;
  languages: string[];
  commitCount: number;
}

export async function searchReposByTopicAndUser(
  username: string,
  topic: string,
  token: string
): Promise<ProcessedRepo[]> {
  const query = `topic:${topic}+user:${username}`;
  const url = `https://api.github.com/search/repositories?q=${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'next-app',
        Accept: 'application/vnd.github.mercy-preview+json' // cần để query topics
      },
      cache: 'force-cache',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("GitHub API error:", res.status, errorText);
      return [];
    }

    const data: { items: GithubRepo[] } = await res.json();

    const detailedRepos: ProcessedRepo[] = await Promise.all(
      data.items.map(async (repo): Promise<ProcessedRepo> => {
        const [languagesRes, commitsRes] = await Promise.all([
          fetch(repo.languages_url, {
            headers: {
              Authorization: `Bearer ${token}`,
              'User-Agent': 'next-app'
            }
          }),
          fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'User-Agent': 'next-app'
            }
          })
        ]);

        const languages = await languagesRes.json();
        const commitCount = getTotalCommitsFromLinkHeader(commitsRes.headers.get("link"));

        return {
          url: `https://github.com/${username}/${repo.name}`,
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics,
          lastUpdate: repo.updated_at,
          languages: Object.keys(languages),
          commitCount
        };
      })
    );


    return detailedRepos;
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    return [];
  }
}

function getTotalCommitsFromLinkHeader(link: string | null): number {
  if (!link) return 1;
  const match = link.match(/&page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1], 10) : 1;
}

