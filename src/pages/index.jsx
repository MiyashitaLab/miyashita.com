import React from 'react';
import { Link } from 'found';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './index.css';
import headerImagePath from '../assets/header.jpg';

import fetchNews from '../utils/fetchNews';
import wait from '../utils/wait';

import Transition from '../components/Transition';
import HeaderImage from '../components/HeaderImage';
import ContentWrapper from '../components/ContentWrapper';
import Loading from '../components/Loading';
import TransitionPageGroup from '../components/TransitionPageGroup';
import ThumbnailCardList from '../components/ThumbnailCardList';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    if (!this.isNewsLoaded) {
      Promise.all([fetchNews(), wait(1500)]).then(([news]) => {
        this.setState({ news });
      });
    }
  }

  get isNewsLoaded() {
    return this.state.news.length !== 0;
  }

  render() {
    const { data } = this.props;
    const { news } = this.state;
    const { projects } = data;
    return (
      <div className={styles.base}>
        <HeaderImage src={headerImagePath} alt="Miyashita Lab" />
        <div className={styles.contentWrapper}>
          <ContentWrapper>
            <h2>最新情報</h2>
            <div>
              <TransitionPageGroup>
                {this.isNewsLoaded ? (
                  <Transition key="loaded">
                    <ThumbnailCardList items={news} />
                  </Transition>
                ) : (
                  <Transition key="loading">
                    <div className={styles.newsLoadingWrapper}>
                      <Loading type="bars" width={48} height={48} delay={0} />
                    </div>
                  </Transition>
                )}
              </TransitionPageGroup>
            </div>
            <h2>プロジェクト</h2>
            <ThumbnailCardList items={projects} />
          </ContentWrapper>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Index);
