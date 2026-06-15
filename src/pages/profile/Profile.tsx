import { useState } from 'react';
import { Star, MapPin, Calendar, Edit, Trash2, Eye, Package, Heart, ShoppingBag, MessageSquare } from 'lucide-react';
import {
  currentUser,
  myProducts,
  myGroupBuys,
  myFavorites,
  myTransactions,
  myReviews,
} from '../../mocks/user';
import styles from './Profile.module.css';

type TabType = 'publish' | 'favorite' | 'transaction' | 'groupbuy' | 'review';

const tabIcons: Record<TabType, React.ElementType> = {
  publish: Package,
  favorite: Heart,
  transaction: ShoppingBag,
  groupbuy: Users2,
  review: MessageSquare,
};

function Users2({ size }: { size: number }) {
  return <ShoppingBag size={size} />;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>('publish');

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'publish', label: '我的发布', icon: Package },
    { id: 'favorite', label: '我的收藏', icon: Heart },
    { id: 'transaction', label: '交易记录', icon: ShoppingBag },
    { id: 'groupbuy', label: '我的拼团', icon: Users2 },
    { id: 'review', label: '我的评价', icon: MessageSquare },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* User Info Card */}
        <div className={styles.userCard}>
          <div className={styles.avatarSection}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{currentUser.name}</h2>
              <p className={styles.userMeta}>
                <span>
                  <MapPin size={16} />
                  {currentUser.campus}
                </span>
                <span>
                  <Calendar size={16} />
                  加入于 {currentUser.joinDate}
                </span>
              </p>
              <div className={styles.rating}>
                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                <span>{currentUser.rating}</span>
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{currentUser.soldCount}</span>
              <span className={styles.statLabel}>已出售</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{currentUser.boughtCount}</span>
              <span className={styles.statLabel}>已购买</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{currentUser.groupBuyCount}</span>
              <span className={styles.statLabel}>参与拼团</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`${styles.tab} ${
                  activeTab === tab.id ? styles.tabActive : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className={styles.content}>
          {activeTab === 'publish' && (
            <div className={styles.list}>
              {myProducts.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <h4>{item.title}</h4>
                    <p className={styles.itemMeta}>
                      <span className={styles.itemPrice}>¥{item.price}</span>
                      <span
                        className={`${styles.status} ${
                          item.status === '已售出' ? styles.statusSold : ''
                        }`}
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>
                  <div className={styles.itemActions}>
                    <button className={styles.actionBtn}>
                      <Edit size={16} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.danger}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'favorite' && (
            <div className={styles.list}>
              {myFavorites.map((item, index) => (
                <div key={index} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemType}>
                      {item.type === 'product' ? '商品' : '帖子'}
                    </span>
                    <h4>{item.title}</h4>
                    {'price' in item && (
                      <p className={styles.itemPrice}>¥{item.price}</p>
                    )}
                    {'author' in item && (
                      <p className={styles.itemMeta}>作者：{item.author}</p>
                    )}
                  </div>
                  <button className={styles.actionBtn}>
                    <Eye size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transaction' && (
            <div className={styles.list}>
              {myTransactions.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <span
                      className={`${styles.transactionType} ${
                        item.type === '买入' ? styles.typeBuy : styles.typeSell
                      }`}
                    >
                      {item.type}
                    </span>
                    <h4>{item.product}</h4>
                    <p className={styles.itemMeta}>
                      {item.type === '买入' ? `卖家：${item.seller}` : `买家：${item.buyer}`}
                      {' · '}
                      {item.date}
                    </p>
                    <p className={styles.itemPrice}>¥{item.price}</p>
                  </div>
                  <div className={styles.ratingInfo}>
                    <div className={styles.stars}>
                      {'★'.repeat(item.rating)}
                      {'☆'.repeat(5 - item.rating)}
                    </div>
                    <p className={styles.comment}>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'groupbuy' && (
            <div className={styles.list}>
              {myGroupBuys.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTag}>{item.role}</span>
                    <h4>{item.title}</h4>
                    <p className={styles.itemMeta}>
                      {item.people}人 · {item.status}
                    </p>
                  </div>
                  <button className={styles.viewBtn}>查看</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'review' && (
            <div className={styles.list}>
              {myReviews.map((item) => (
                <div key={item.id} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <h4>来自：{item.from}</h4>
                    <p className={styles.itemMeta}>
                      商品：{item.product} · {item.date}
                    </p>
                    <div className={styles.stars}>
                      {'★'.repeat(item.rating)}
                      {'☆'.repeat(5 - item.rating)}
                    </div>
                    <p className={styles.reviewContent}>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}