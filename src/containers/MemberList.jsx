import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './MemberList.css';
import withTracker from '~/lib/withTracker';
import withMetadata from '~/lib/withMetadata';
import withRouteData from '~/lib/withRouteData';
import ArticleHeader from '~/components/ArticleHeader';
import SectionHeader from '~/components/SectionHeader';
import MemberCard from '~/components/MemberCard';

const headerImage =
  'https://lh3.googleusercontent.com/MNyLbvHbcyS-PUWdXUINZhkzaxkmhgNtfBFr3LVZrbh-rVuRWD7XgfuiXlmPhVOr6Dq3EZJmehriSE3aaiHLN_mVSd5uLn7EBLyAoWeLnj-nfgo6KA57g9Ka13z4H7dvQurIl3UDlr5vAtLBtjMYyig2kUDokDnQdlopteTuNwu0Ip274BZRu5NRo-7-3dPrZ_cHeS1dtpX-OFD2WDB44ZUepE9L3hB1kc9zp2hjgjCXnft5qhfVl7O-1-3h95FpYtlHC4avnNJ53o4xmBYw1DfvBT3VHjC7EB6TA_pU5qS2Zee0dbFUpPZvwhP5soWqvFbtB4Now0RJgqi2_urmQJhsxlbxjBfvZvJJ7fRj2gD1JNr1hnZ6padY9pP7iGo02xK2DkQ0ftOEDJY10Va_jtiQxg6KD-tqWRZJUn55y5OY0-xEhmppphZCgIWmuVyjrjtNdzwQ9ib0_BsKitYHsMCbho_qx0OMnMKuX6q_TXAjd9F2OzuL-hpEvPa0XhkxmT-ocqdlKjyOzG2h637OT845g6_DfzI77bOofc-EAzAVtFeThXU9CUDR-9RqJPSJqzKp9lFSBhaiyqJf2lpH3DPDdhoM9Z-Um48k3F4BVQ=s0';

const MemberList = ({ page }) => (
  <div className={styles.base}>
    <ArticleHeader title="メンバー" src={headerImage} />
    <div className={styles.content}>
      <section>
        <SectionHeader>現役メンバー</SectionHeader>
        <div className={styles.memberList}>
          {page.currentMembers.map(member => (
            <MemberCard key={member.name} info={member} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader>歴代メンバー</SectionHeader>
        <div className={styles.memberList}>
          {page.OBMembers.map(member => (
            <MemberCard key={member.name} info={member} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default withTracker(withMetadata(withRouteData(withStyles(styles)(MemberList))));
