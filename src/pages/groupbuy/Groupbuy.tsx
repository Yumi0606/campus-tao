import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import GroupBuyCard from '../../components/base/GroupBuyCard';
import { groupBuys } from '../../mocks/groupBuys';
import styles from './Groupbuy.module.css';

type StatusFilter = 'all' | '进行中' | '即将成团' | '已成团' | '已结束';

export default function Groupbuy() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const statusOptions: { id: StatusFilter; label: string; count: number }[] = [
    { id: 'all', label: '全部', count: groupBuys.length },
    {
      id: '进行中',
      label: '进行中',
      count: groupBuys.filter((g) => g.status === '进行中').length,
    },
    {
      id: '即将成团',
      label: '即将成团',
      count: groupBuys.filter((g) => g.status === '即将成团').length,
    },
    {
      id: '已成团',
      label: '已成团',
      count: groupBuys.filter((g) => g.status === '已成团').length,
    },
    {
      id: '已结束',
      label: '已结束',
      count: groupBuys.filter((g) => g.status === '已结束').length,
    },
  ];

  const filteredGroupBuys = useMemo(() => {
    if (statusFilter === 'all') return groupBuys;
    return groupBuys.filter((g) => g.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>拼团团购</h1>
          <p className={styles.subtitle}>人多力量大，一起省钱</p>
        </div>

        {/* How it works */}
        <div className={styles.howItWorks}>
          <h3 className={styles.howTitle}>拼团流程</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <span>浏览拼团</span>
            </div>
            <span className={styles.stepArrow}>→</span>
            <div className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <span>报名参团</span>
            </div>
            <span className={styles.stepArrow}>→</span>
            <div className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <span>等待成团</span>
            </div>
            <span className={styles.stepArrow}>→</span>
            <div className={styles.step}>
              <span className={styles.stepNumber}>4</span>
              <span>线下取货</span>
            </div>
          </div>
          <p className={styles.howNote}>
            团主负责统一购买与分发，团员线上报名后线下付款取货
          </p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.publishBtn}>
            <Plus size={20} />
            发起拼团
          </button>
        </div>

        {/* Status Filter */}
        <div className={styles.statusFilter}>
          {statusOptions.map((option) => (
            <button
              key={option.id}
              className={`${styles.statusBtn} ${
                statusFilter === option.id ? styles.statusBtnActive : ''
              }`}
              onClick={() => setStatusFilter(option.id)}
            >
              {option.label}
              <span className={styles.count}>{option.count}</span>
            </button>
          ))}
        </div>

        {/* Group Buy Grid */}
        {filteredGroupBuys.length > 0 ? (
          <div className={styles.grid}>
            {filteredGroupBuys.map((groupBuy) => (
              <GroupBuyCard key={groupBuy.id} groupBuy={groupBuy} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>暂无该状态的拼团</p>
          </div>
        )}
      </div>
    </div>
  );
}