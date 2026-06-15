import { Link } from 'react-router-dom';
import { MapPin, Clock, Users } from 'lucide-react';
import type { GroupBuy } from '../../mocks/types';
import styles from './GroupBuyCard.module.css';

interface GroupBuyCardProps {
  groupBuy: GroupBuy;
}

const statusStyles: Record<string, { bg: string; color: string }> = {
  '进行中': { bg: '#EFF6FF', color: '#3B82F6' },
  '即将成团': { bg: '#FEF3C7', color: '#B45309' },
  '已成团': { bg: '#DCFCE7', color: '#15803D' },
  '已结束': { bg: '#F5F5F5', color: '#737373' },
};

export default function GroupBuyCard({ groupBuy }: GroupBuyCardProps) {
  const progress = (groupBuy.currentPeople / groupBuy.minPeople) * 100;
  const remaining = groupBuy.minPeople - groupBuy.currentPeople;
  const style = statusStyles[groupBuy.status];

  return (
    <Link to={`/groupbuy/${groupBuy.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={groupBuy.image} alt={groupBuy.title} className={styles.image} />
        <span
          className={styles.status}
          style={{ background: style.bg, color: style.color }}
        >
          {groupBuy.status}
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{groupBuy.title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.groupPrice}>¥{groupBuy.groupPrice}</span>
          <span className={styles.originalPrice}>¥{groupBuy.originalPrice}</span>
          <span className={styles.save}>
            省¥{(groupBuy.originalPrice - groupBuy.groupPrice).toFixed(0)}
          </span>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className={styles.progressText}>
            <span>
              <Users size={16} />
              {groupBuy.currentPeople}/{groupBuy.minPeople} 人
            </span>
            {remaining > 0 && groupBuy.status !== '已结束' && (
              <span className={styles.remaining}>差{remaining}人</span>
            )}
          </div>
        </div>

        <div className={styles.meta}>
          <span>
            <MapPin size={16} />
            {groupBuy.campus}
          </span>
          <span>
            <Clock size={16} />
            {groupBuy.deadline.split(' ')[0]}
          </span>
        </div>

        <div className={styles.organizer}>
          <img
            src={groupBuy.organizer.avatar}
            alt={groupBuy.organizer.name}
            className={styles.avatar}
          />
          <span>团主：{groupBuy.organizer.name}</span>
        </div>
      </div>
    </Link>
  );
}