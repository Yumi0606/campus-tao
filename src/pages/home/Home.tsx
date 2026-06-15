import { Link } from 'react-router-dom';
import { Package, Users, MessageSquare, ArrowRight, TrendingUp, ShoppingBag } from 'lucide-react';
import ProductCard from '../../components/base/ProductCard';
import GroupBuyCard from '../../components/base/GroupBuyCard';
import PostCard from '../../components/base/PostCard';
import { products } from '../../mocks/products';
import { groupBuys } from '../../mocks/groupBuys';
import { posts } from '../../mocks/posts';
import styles from './Home.module.css';

export default function Home() {
  const hotProducts = products.slice(0, 4);
  const hotGroupBuys = groupBuys.filter(g => g.status !== '已结束').slice(0, 3);
  const hotPosts = posts.filter(p => p.isHot || p.isPinned).slice(0, 3);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          让闲置流动
          <br />
          让相遇温暖
        </h1>
        <p className={styles.heroSubtitle}>
          校园专属二手交易平台，安全、便捷、有温度
        </p>
        <div className={styles.heroActions}>
          <Link to="/secondhand" className={styles.primaryBtn}>
            <Package size={22} />
            浏览二手
          </Link>
          <Link to="/groupbuy" className={styles.secondaryBtn}>
            <Users size={22} />
            参与拼团
          </Link>
          <Link to="/forum" className={styles.secondaryBtn}>
            <MessageSquare size={22} />
            逛逛论坛
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <Link to="/secondhand" className={styles.featureCard}>
          <div className={styles.featureIconWrap}>
            <Package size={28} className={styles.featureIcon} />
          </div>
          <h3>二手交易</h3>
          <p>闲置好物，低价淘换</p>
          <ArrowRight size={18} className={styles.featureArrow} />
        </Link>
        <Link to="/groupbuy" className={styles.featureCard}>
          <div className={styles.featureIconWrap}>
            <Users size={28} className={styles.featureIcon} />
          </div>
          <h3>拼团团购</h3>
          <p>人多优惠，一起省钱</p>
          <ArrowRight size={18} className={styles.featureArrow} />
        </Link>
        <Link to="/forum" className={styles.featureCard}>
          <div className={styles.featureIconWrap}>
            <MessageSquare size={28} className={styles.featureIcon} />
          </div>
          <h3>校园论坛</h3>
          <p>攻略分享，信息交流</p>
          <ArrowRight size={18} className={styles.featureArrow} />
        </Link>
      </section>

      {/* Hot Products */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <TrendingUp size={22} />
            热门二手
          </h2>
          <Link to="/secondhand" className={styles.moreLink}>
            查看更多 <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.productGrid}>
          {hotProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Hot Group Buys */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <ShoppingBag size={22} />
            热门拼团
          </h2>
          <Link to="/groupbuy" className={styles.moreLink}>
            查看更多 <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.groupBuyGrid}>
          {hotGroupBuys.map((groupBuy) => (
            <GroupBuyCard key={groupBuy.id} groupBuy={groupBuy} />
          ))}
        </div>
      </section>

      {/* Hot Posts */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <MessageSquare size={22} />
            热门帖子
          </h2>
          <Link to="/forum" className={styles.moreLink}>
            查看更多 <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.postGrid}>
          {hotPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>1,234</span>
          <span className={styles.statLabel}>活跃用户</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>5,678</span>
          <span className={styles.statLabel}>在售商品</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>892</span>
          <span className={styles.statLabel}>成功交易</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>156</span>
          <span className={styles.statLabel}>进行中拼团</span>
        </div>
      </section>
    </div>
  );
}