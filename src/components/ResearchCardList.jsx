import React from 'react';
import axios from 'axios';

import CardList from '~/components/CardList';
import ArticleCard from '~/components/ArticleCard';
import ReadmoreCard from '~/components/ReadmoreCard';

class ResearchCardList extends React.Component {
  state = {
    researches: [],
  };

  componentDidMount() {
    this.fetchResearchList().catch(err => console.error(err));
  }

  async fetchResearchList() {
    const { data } = await axios.get('https://research.miyashita.com/api/papers', {
      params: {
        fields: JSON.stringify([
          'core.id',
          'core.title',
          'core.thumbnail',
          'publication.publishedDate',
          'embed.youtube',
        ]),
        sort: JSON.stringify({
          'publication.publishedDate': -1,
        }),
      },
    });

    this.setState({
      researches: data.slice(0, 8).map(info => ({
        id: info.core.id,
        title: info.core.title,
        date: info.publication.publishedDate,
        thumbnail: info.core.thumbnail || this.getYouTubeThumbnail(info.embed.youtube),
        permalink: `https://research.miyashita.com/papers/${info.core.id}`,
      })),
    });
  }

  getYouTubeThumbnail(youtubeUrl) {
    const YOUTUBE_REGEXP = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([a-zA-Z0-9_-]+)/;
    if (YOUTUBE_REGEXP.test(youtubeUrl)) {
      const [, videoId] = youtubeUrl.match(YOUTUBE_REGEXP);
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
    return null;
  }

  render() {
    const { researches } = this.state;

    if (researches.length === 0) {
      return null;
    } else {
      return (
        <CardList>
          {researches.map(research => (
            <ArticleCard key={research.id} item={research} />
          ))}
          <ReadmoreCard href="https://research.miyashita.com" />
        </CardList>
      );
    }
  }
}

export default ResearchCardList;
