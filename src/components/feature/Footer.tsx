import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.logo}>⇄ 校园市集</span>
            <p className={styles.slogan}>让闲置流动，让相遇温暖</p>
          </div>

          <div className={styles.links}>
            <div className={styles.section}>
              <h4>功能</h4>
              <Link to="/secondhand">二手交易</Link>
              <Link to="/groupbuy">拼团团购</Link>
              <Link to="/forum">校园论坛</Link>
            </div>
            <div className={styles.section}>
              <h4>帮助</h4>
              <a href="#">使用指南</a>
              <a href="#">安全交易</a>
              <a href="#">联系我们</a>
            </div>
            <div className={styles.section}>
              <h4>关于</h4>
              <a href="#">关于我们</a>
              <a href="#">用户协议</a>
              <a href="#">隐私政策</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 校园市集</p>
          <p className={styles.disclaimer}>
            平台仅提供信息展示，不涉及资金托管。建议校内面交。
          </p>
        </div>
      </div>
    </footer>
  );
}