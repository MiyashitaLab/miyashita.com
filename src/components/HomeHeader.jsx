import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './HomeHeader.css';
import OptimizedImage from '~/components/OptimizedImage';

const imageUrl =
  "https://lh3.googleusercontent.com/W-dGci7sIPb-OYtkmG_VD7zpKxOzz747A0B2s5bYop2MFUUPxqxYtnyyrQX8jKH9bkIC_tGmjURnnyO8HXd0wr44buU6ZPScZfQrbkfshvYBd9EIy0s9xsjLjpoTGBh2nJq2U7c41E-chLebjFHTi_9hiRWhhYKvJsuWkS2qfttk0hrJ89iLGsAndboQVI8ufgRtyvK26nvzwqPFFH8wxpA817FAg9jH6sMWILdMfyrBBvb7oj0xP2q3wc-wa5a9IrBu3-ULCqZxHs_B3-jHPZBCVM0nhvgU4PIHHzdS280X2IxLKEeBaQCor0DZDYfRcYl0xZka-k-UzGqFTfO5BFjvNlPnKWt1IKJTTXO2X1xDZaIziZC01SHP9dK1p1Z_Hl_jOqprorH2wdNbS_DkiBmxVbHFCNAq5-BvbAeJPoZoulWXVcd-RawvTfaXtePX4VSLThJf_qhUluo2qWmftbW6xRqeZdEoTK_bjb_PNNQYyJxW3nTd1ZgSGV_U7zGnBd-vpMgqU_eX_S8FoZqaM4ExIUqpweJ29VrJZBFhqFqqyyeRuRkgE03lb2HsUkKiUOqy2CK__o4uof7hwKDxzRcCyDXyw-PjuwBjKkNtfKhKmozjyCI-AVGkoli6rpv4Nbu9iSSz2r-v5TCwtUZmNJz2gzeDNRlHl4AxRwO8Zy-BxRCkHTqztMXBaOveEll68AfS_aVqo_qQ-Pwi_1D2c5qMgV_ZE3eB2pUFvWdnwEZnelKpwu9U15Miiuzuv9QqcCoBaxL4HPFRaATNhF0=w1054-h356-no?authuser=0\"), url(\"https://lh3.googleusercontent.com/W-dGci7sIPb-OYtkmG_VD7zpKxOzz747A0B2s5bYop2MFUUPxqxYtnyyrQX8jKH9bkIC_tGmjURnnyO8HXd0wr44buU6ZPScZfQrbkfshvYBd9EIy0s9xsjLjpoTGBh2nJq2U7c41E-chLebjFHTi_9hiRWhhYKvJsuWkS2qfttk0hrJ89iLGsAndboQVI8ufgRtyvK26nvzwqPFFH8wxpA817FAg9jH6sMWILdMfyrBBvb7oj0xP2q3wc-wa5a9IrBu3-ULCqZxHs_B3-jHPZBCVM0nhvgU4PIHHzdS280X2IxLKEeBaQCor0DZDYfRcYl0xZka-k-UzGqFTfO5BFjvNlPnKWt1IKJTTXO2X1xDZaIziZC01SHP9dK1p1Z_Hl_jOqprorH2wdNbS_DkiBmxVbHFCNAq5-BvbAeJPoZoulWXVcd-RawvTfaXtePX4VSLThJf_qhUluo2qWmftbW6xRqeZdEoTK_bjb_PNNQYyJxW3nTd1ZgSGV_U7zGnBd-vpMgqU_eX_S8FoZqaM4ExIUqpweJ29VrJZBFhqFqqyyeRuRkgE03lb2HsUkKiUOqy2CK__o4uof7hwKDxzRcCyDXyw-PjuwBjKkNtfKhKmozjyCI-AVGkoli6rpv4Nbu9iSSz2r-v5TCwtUZmNJz2gzeDNRlHl4AxRwO8Zy-BxRCkHTqztMXBaOveEll68AfS_aVqo_qQ-Pwi_1D2c5qMgV_ZE3eB2pUFvWdnwEZnelKpwu9U15Miiuzuv9QqcCoBaxL4HPFRaATNhF0"

const HomeHeader = () => (
  <header className={styles.base}>
    <div className={styles.imageWrapper}>
      <OptimizedImage className={styles.image} src={imageUrl} width="1280" alt="Miyashita Lab" />
    </div>
    <div className={styles.bgImageWrapper}>
      <OptimizedImage className={styles.bgImage} src={imageUrl} width="1280" alt="Miyashita Lab" />
    </div>
  </header>
);

export default withStyles(styles)(HomeHeader);
